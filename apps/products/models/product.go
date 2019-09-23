package models

import (
	"time"

	pb "github.com/EduardoRFS/hash-test/packages/protos/dist"

	"github.com/go-pg/pg/v9"
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

type Product struct {
	tableName    struct{}  `sql:"product"`
	CreatedAt    time.Time `json:"created_at"`
	ID           uuid.UUID `json:"id", sql:"type:uuid"`
	PriceInCents uint64    `json:"price_in_cents"`
	Title        string    `json:"title"`
	Description  string    `json:"description"`
}

func CreateProduct(db *pg.DB, p *Product) error {
	return db.Insert(p)
}
func ListProducts(db *pg.DB) ([]*Product, error) {
	var products []*Product
	err := db.Model(&products).Select()
	if err != nil {
		return nil, err
	}
	if products == nil {
		return []*Product{}, nil
	}
	return products, nil
}
func FindProductByIds(db *pg.DB, ids []string) ([]*Product, error) {
	uids, err := mapStringToUuid(ids)

	if err != nil {
		return nil, err
	}

	products := make([]*Product, len(ids))

	err = db.Model(&products).WhereIn("id IN (?)", uids).Select()

	if err != nil {
		return nil, err
	}

	return products, nil
}
func FindProductById(db *pg.DB, id string) (*Product, error) {
	products, err := FindProductByIds(db, []string{id})

	if err != nil {
		return nil, err
	}
	if len(products) == 0 {
		return nil, nil
	}
	return products[0], nil
}
func ProductToProto(p *Product) *pb.Product {
	return &pb.Product{
		Id:           p.ID.String(),
		PriceInCents: p.PriceInCents,
		Title:        p.Title,
		Description:  p.Description,
	}
}
