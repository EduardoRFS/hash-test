package rpc

import (
	"context"
	"net"

	"github.com/EduardoRFS/hash-test/apps/products/models"
	"github.com/EduardoRFS/hash-test/apps/products/services"

	pb "github.com/EduardoRFS/hash-test/packages/protos/dist"
	"github.com/go-pg/pg/v9"
	"google.golang.org/genproto/googleapis/rpc/code"
	"google.golang.org/genproto/googleapis/rpc/status"
	"google.golang.org/grpc"
)

type productsServer struct {
	db      *pg.DB
	service *services.ProductService
}

func (s *productsServer) CreateProduct(ctx context.Context, req *pb.CreateProductRequest) (*pb.CreateProductResponse, error) {
	product := &models.Product{
		PriceInCents: req.PriceInCents,
		Title:        req.Title,
		Description:  req.Description,
	}

	err := models.CreateProduct(s.db, product)
	if err != nil {
		return &pb.CreateProductResponse{
			Status: &status.Status{
				Code:    code.Code_value["INTERNAL"],
				Message: err.Error(),
			},
		}, nil
	}

	return &pb.CreateProductResponse{
		Status: &status.Status{
			Code: code.Code_value["OK"],
		},
		Product: models.ProductToProto(product),
	}, nil
}

func (s *productsServer) ReadProduct(ctx context.Context, req *pb.ReadProductRequest) (*pb.ReadProductResponse, error) {
	product, err := models.FindProductById(s.db, req.Id)
	if err != nil {
		return &pb.ReadProductResponse{
			Status: &status.Status{
				Code:    code.Code_value["INTERNAL"],
				Message: err.Error(),
			},
		}, nil
	}

	return &pb.ReadProductResponse{
		Status: &status.Status{
			Code: code.Code_value["OK"],
		},
		Product: models.ProductToProto(product),
	}, nil
}

func (s *productsServer) ListProducts(ctx context.Context, req *pb.ListProductsRequest) (*pb.ListProductsResponse, error) {
	var products []*models.Product
	var err error
	if req.Id == nil {
		products, err = models.ListProducts(s.db)
	} else {
		products, err = models.FindProductByIds(s.db, req.Id)
	}

	if err != nil {
		return &pb.ListProductsResponse{
			Status: &status.Status{
				Code:    code.Code_value["INTERNAL"],
				Message: err.Error(),
			},
		}, nil
	}

	protos := make([]*pb.Product, len(products))
	for i, v := range products {
		protos[i] = models.ProductToProto(v)
	}

	return &pb.ListProductsResponse{
		Status: &status.Status{
			Code: code.Code_value["OK"],
		},
		Products: protos,
	}, nil
}

func StartProductServer(db *pg.DB, discountClient pb.DiscountsServiceClient, listen string) net.Listener {
	server := grpc.NewServer()
	productServer := &productsServer{
		db: db, service: services.NewProductService(discountClient)}
	pb.RegisterProductsServiceServer(server, productServer)

	lis, err := net.Listen("tcp", listen)
	if err != nil {
		panic(lis)
	}
	server.Serve(lis)
	return lis
}
