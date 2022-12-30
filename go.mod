module github.com/EduardoRFS/hash-test

go 1.13

require (
	github.com/gin-gonic/gin v1.7.0
	github.com/go-pg/migrations/v7 v7.1.3
	github.com/go-pg/pg/v9 v9.0.0-beta.9
	github.com/golang/protobuf v1.3.3
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.1 // indirect
	github.com/satori/go.uuid v1.2.0
	golang.org/x/net v0.0.0-20190503192946-f4e77d36d62c // indirect
	google.golang.org/genproto v0.0.0-20190916214212-f660b8655731
	google.golang.org/grpc v1.23.1
	gopkg.in/go-playground/assert.v1 v1.2.1 // indirect
	gopkg.in/go-playground/validator.v8 v8.18.2 // indirect
)

replace google.golang.org/genproto/googleapis/rpc/code => ./packages/protos/dist/google.golang.org/genproto/googleapis/rpc/code
