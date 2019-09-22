package main

import (
	"sync"

	"github.com/EduardoRFS/hash-test/apps/products/config"
	"github.com/EduardoRFS/hash-test/apps/products/http"
	"github.com/EduardoRFS/hash-test/apps/products/rpc"

	pb "github.com/EduardoRFS/hash-test/packages/protos/dist"

	"github.com/go-pg/pg/v9"
	"google.golang.org/grpc"
)

type App struct {
	config         config.Config
	db             *pg.DB
	discountClient pb.DiscountsServiceClient
}

func (app *App) registerConfig(config config.Config) {
	app.config = config
}
func (app *App) startDB() {
	app.db = pg.Connect(&pg.Options{
		Addr:     app.config.DBAddr,
		User:     app.config.DBUser,
		Password: app.config.DBPassword,
		Database: app.config.DBName,
	})
}
func (app *App) closeDB() {
	app.db.Close()
}
func (app *App) startDiscountClient() {
	opts := grpc.WithInsecure()
	conn, err := grpc.Dial(app.config.DiscountService, opts)

	if err != nil {
		panic(err)
	}

	app.discountClient = pb.NewDiscountsServiceClient(conn)
}
func (app *App) startGRPC() {
	lis := rpc.StartProductServer(app.db, app.config.ListenGRPC)
	defer lis.Close()
}
func (app *App) startHTTP() {
	http.StartProductServer(app.db, app.discountClient, app.config.ListenHTTP)
}
func main() {
	app := &App{}

	app.registerConfig(config.DefaultConfig)
	app.startDB()
	defer app.closeDB()
	app.startDiscountClient()

	var wg sync.WaitGroup
	wg.Add(1)

	go func() {
		defer wg.Done()
		app.startGRPC()
	}()
	go func() {
		defer wg.Done()
		app.startHTTP()
	}()

	wg.Wait()
}
