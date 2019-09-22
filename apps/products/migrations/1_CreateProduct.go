package main

import (
	"fmt"

	"github.com/go-pg/migrations/v7"
)

func init() {
	migrations.MustRegisterTx(func(db migrations.DB) error {
		fmt.Println("creating table product...")
		_, err := db.Exec(`
		CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
		CREATE TABLE "product" (
			"created_at" TIMESTAMP NOT NULL DEFAULT now(),
			"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
			"price_in_cents" numeric NOT NULL,
			"title" text NOT NULL,
			"description" text NOT NULL,
			PRIMARY KEY ("id")
		)
		`)
		return err
	}, func(db migrations.DB) error {
		fmt.Println("dropping table product...")
		_, err := db.Exec(`DROP TABLE "product"`)
		return err
	})
}
