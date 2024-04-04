package main

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
	"github.com/sirupsen/logrus"
)

const port = 50002

type AppConfig struct {
	Logger *logrus.Logger
	Rabbit *amqp.Connection
}

var app *AppConfig

func main() {
	hook, logger, err := getLogger()
	if err != nil {
		log.Panic(err)
	}
	defer hook.Close()

	rabbitConn, err := connect()
	if err != nil {
		log.Panic(err)
	}
	defer rabbitConn.Close()

	app = &AppConfig{
		Logger: logger,
		Rabbit: rabbitConn,
	}

	gRPCListen()
}
