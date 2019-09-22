package services

import (
	"github.com/EduardoRFS/hash-test/apps/products/models"
	pb "github.com/EduardoRFS/hash-test/packages/protos/dist"

	uuid "github.com/satori/go.uuid"
)

func mapStringToUuid(ids []string) ([]uuid.UUID, error) {
	uids := make([]uuid.UUID, len(ids))
	for i, v := range ids {
		uid, err := uuid.FromString(v)

		if err != nil {
			return nil, err
		}
		uids[i] = uid
	}
	return uids, nil
}

type ProductService struct {
	discountClient pb.DiscountsServiceClient
}

func (s *ProductService) LoadDiscount(product *pb.Product, userID *string) error {
	return s.LoadDiscounts([]*pb.Product{product}, userID)
}
func (s *ProductService) LoadDiscounts(products []*pb.Product, userID *string) error {
	ids := make([]string, len(products))

	for i, p := range products {
		ids[i] = p.Id
	}

	discounts, err := models.FindDiscounts(s.discountClient, ids, userID)

	for i, p := range products {
		if err == nil || len(discounts) > i {
			discount := discounts[i]
			if discount.Pct != 0 || discount.ValueInCents != 0 {
				p.Discount = discounts[i]
			}
		}
	}

	return err
}

func NewProductService(discountClient pb.DiscountsServiceClient) *ProductService {
	return &ProductService{discountClient}
}
