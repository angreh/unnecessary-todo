package main

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
	"go.mongodb.org/mongo-driver/mongo"
)

type AppConfig struct {
	Rabbit *amqp.Connection
	Mongo  *mongo.Client
}

var app *AppConfig

func main() {
	rabbitConn, err := connect()
	if err != nil {
		log.Panic(err)
	}
	defer rabbitConn.Close()

	mongoClient, err := connectToMongo()
	if err != nil {
		log.Panic(err)
	}

	app = &AppConfig{
		Rabbit: rabbitConn,
		Mongo:  mongoClient,
	}

	consumer, err := newConsumer()
	if err != nil {
		panic(err)
	}

	err = consumer.Listen([]string{"log.INFO", "log.WARNING", "log.ERROR"})
	if err != nil {
		log.Println(err)
	}
}
