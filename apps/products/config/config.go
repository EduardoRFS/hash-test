package config

type Config struct {
	ListenHTTP string
	ListenGRPC string

	DiscountService string

	DBAddr     string
	DBUser     string
	DBPassword string
	DBName     string
}

var DefaultConfig = Config{
	ListenHTTP: ":8080",
	ListenGRPC: ":50051",

	DiscountService: "api-discounts:50051",

	DBAddr:     "db-products:5432",
	DBUser:     "postgres",
	DBPassword: "ai_tem_de_mudar_isso_aqui",
	DBName:     "products",
}
