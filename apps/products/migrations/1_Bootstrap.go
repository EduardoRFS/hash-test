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
		);
		INSERT INTO product (created_at, id, price_in_cents, title, description) VALUES('2019-09-21 23:51:00.425', '33687aa8-0537-469a-8b11-410e5681d49a', 1256, 'Desu', 'Ne');
		INSERT INTO product (created_at, id, price_in_cents, title, description) VALUES('2019-09-22 22:39:48.200', '4b52538f-ac0b-4ef3-b86f-9ca5505a0d56', 5432, 'ABC', 'YZ');
		INSERT INTO product (created_at, id, price_in_cents, title, description) VALUES('2019-09-22 22:39:48.212', '69f15755-bab3-4924-81da-9547f921cfea', 47658, 'DEF', 'VWX');
		INSERT INTO product (created_at, id, price_in_cents, title, description) VALUES('2019-09-22 22:39:48.214', 'a97038af-77cd-4151-b6b2-306e4e480180', 4321, 'GHI', 'STU');
		INSERT INTO product (created_at, id, price_in_cents, title, description) VALUES('2019-09-22 22:39:48.216', '5fe101f0-e3f3-43ca-97a0-018a89f5c8f4', 1234, 'JKL', 'PQR');
		INSERT INTO product (created_at, id, price_in_cents, title, description) VALUES('2019-09-22 22:39:48.218', 'c408f06a-8033-4dc6-b158-0d8230449d1a', 7456, 'MNO', 'MNO');
		INSERT INTO product (created_at, id, price_in_cents, title, description) VALUES('2019-09-22 22:39:48.220', 'a0cc835b-cf49-43e9-b549-057e605b5f8a', 3456, 'PQR', 'JKL');
		INSERT INTO product (created_at, id, price_in_cents, title, description) VALUES('2019-09-22 22:39:48.222', '59494795-74d3-4251-aaa9-ec5cfeea9a06', 8769, 'STU', 'GHI');
		INSERT INTO product (created_at, id, price_in_cents, title, description) VALUES('2019-09-22 22:39:48.223', '03d0c137-cdc2-4f9d-8bb9-fe2390e81d97', 2134, 'VWX', 'DEF');
		INSERT INTO product (created_at, id, price_in_cents, title, description) VALUES('2019-09-22 22:39:48.225', 'caeba849-305c-460d-9cc1-64d06e9a6c35', 543634, 'YZ', 'ABC');
		`)
		return err
	}, func(db migrations.DB) error {
		fmt.Println("dropping table product...")
		_, err := db.Exec(`DROP TABLE "product"`)
		return err
	})
}
