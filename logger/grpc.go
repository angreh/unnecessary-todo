package main

import (
	"context"
	"fmt"
	"log"
	"logger-service/logger"
	"net"

	"github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

type LoggerService struct {
	logger.UnimplementedLoggerServiceServer
}

func gRPCListen() {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("fail to listen for gRPC: %s", err)
	}

	server := grpc.NewServer()

	logger.RegisterLoggerServiceServer(server, &LoggerService{})

	log.Printf("gRPC Server started on port %d", port)

	if err := server.Serve(lis); err != nil {
		log.Fatalf("fail to listen for gRPC: %s", err)
	}
}

func (l *LoggerService) Register(_ context.Context, req *logger.RegisterRequest) (*logger.RegisterResponse, error) {
	log.Println("Register caller")

	app.Logger.WithFields(logrus.Fields{
		"name":   "todo-app",
		"action": req.Log.Action,
	}).Info(req.Log.Message)

	internalRegister(req.Log)

	return &logger.RegisterResponse{
		Success: true,
	}, nil
}

// log.WithFields(logrus.Fields{
// 	"animal": "walrus",
// 	"number": 0,
// }).Trace("Went to the beach")

// log.WithFields(logrus.Fields{
// 	"animal": "walrus",
// 	"number": 8,
// }).Debug("Started observing beach")

// log.WithFields(logrus.Fields{
// 	"animal": "walrus",
// 	"size":   10,
// }).Info("A group of walrus emerges from the ocean")

// log.WithFields(logrus.Fields{
// 	"name":    "my-app",
// 	"message": "action",
// }).Info("login")

// log.WithFields(logrus.Fields{
// 	"omg":    true,
// 	"number": 122,
// }).Warn("The group's number increased tremendously!")

// log.WithFields(logrus.Fields{
// 	"temperature": -4,
// }).Debug("Temperature changes")
