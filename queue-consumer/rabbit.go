package main

import (
	"fmt"
	"log"
	"math"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func connect() (*amqp.Connection, error) {
	var counts int64
	var backOff = 1 * time.Second
	var connection *amqp.Connection

	for {
		c, err := amqp.Dial("amqp://guest:guest@ct-rabbitmq")
		if err != nil {
			log.Println("RabbitMQ not yet ready ...")
			counts++
		} else {
			log.Println("Connected to RabbitMQ!")
			connection = c
			break
		}

		if counts > 10 {
			fmt.Println(err)
			return nil, err
		}

		backOff = time.Duration(math.Pow(float64(counts), 2))
		log.Println("backing off ...")
		time.Sleep(backOff)

		continue
	}

	return connection, nil
}

// ok
func declareExchange(ch *amqp.Channel) error {
	return ch.ExchangeDeclare(
		"logs_topic", // name
		"topic",      // kind
		true,         // is durable
		false,        // is auto-deleted
		false,        // is internal
		false,        // is no-wait
		nil,          // arguments
	)
}

// ok
func declareRandomQueue(ch *amqp.Channel) (amqp.Queue, error) {
	return ch.QueueDeclare(
		"",    // name
		false, // is durable
		false, // delete when unused
		true,  // is exclusive
		false, // is no-wait
		nil,   // arguments
	)
}
