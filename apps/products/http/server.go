package http

import (
	"github.com/EduardoRFS/hash-test/apps/products/models"
	"github.com/EduardoRFS/hash-test/apps/products/services"
	pb "github.com/EduardoRFS/hash-test/packages/protos/dist"

	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg/v9"
)

type productsServer struct {
	db      *pg.DB
	service *services.ProductService
}

func (s *productsServer) GetProduct(c *gin.Context) {
	userID := c.GetHeader("X-USER-ID")
	products, err := models.ListProducts(s.db)
	if err != nil {
		panic(err)
	}

	protos := make([]*pb.Product, len(products))

	for i, p := range products {
		protos[i] = models.ProductToProto(p)
	}
	s.service.LoadDiscounts(protos, &userID)
	c.JSON(200, protos)
}
func StartProductServer(db *pg.DB, discountClient pb.DiscountsServiceClient, listen string) {
	productServer := &productsServer{
		db:      db,
		service: services.NewProductService(discountClient),
	}
	r := gin.Default()
	r.GET("/product", productServer.GetProduct)
	err := r.Run(listen)
	if err != nil {
		panic(err)
	}
}
