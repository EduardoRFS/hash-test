module github.com/EduardoRFS/hash-test

go 1.13

require (
	github.com/gin-gonic/gin v1.4.0
	github.com/go-pg/migrations/v7 v7.1.3
	github.com/go-pg/pg/v9 v9.0.0-beta.9
	github.com/golang/protobuf v1.3.2
	github.com/satori/go.uuid v1.2.0
	google.golang.org/genproto v0.0.0-20190916214212-f660b8655731
	google.golang.org/grpc v1.23.1
)

replace google.golang.org/genproto/googleapis/rpc/code => ./packages/protos/dist/google.golang.org/genproto/googleapis/rpc/code
