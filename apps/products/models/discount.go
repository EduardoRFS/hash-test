package models

import (
	"fmt"

	"context"
	"errors"
	"time"

	pb "github.com/EduardoRFS/hash-test/packages/protos/dist"
	"google.golang.org/genproto/googleapis/rpc/code"
)

func FindDiscounts(client pb.DiscountsServiceClient, productIds []string, userId *string) ([]*pb.Discount, error) {
	makeRequests := func() []*pb.DiscountRequest {
		requests := make([]*pb.DiscountRequest, len(productIds))
		for i, v := range productIds {
			request := &pb.DiscountRequest{ProductId: v}
			if userId != nil {
				request.UserId = *userId
			}
			requests[i] = request
		}
		return requests
	}

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	requests := makeRequests()
	response, err := client.FindDiscounts(ctx, &pb.FindDiscountsRequest{Requests: requests})

	if err != nil {
		fmt.Print(err)
		return nil, err
	}

	status := response.Status
	if status.Code != code.Code_value["OK"] {
		return nil, errors.New(status.Message)
	}
	return response.Discount, nil
}
