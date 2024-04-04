package main

import (
	"encoding/json"
	"fmt"
	"log"
	"logger-service/logger"
	"math"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

type LogPayload struct {
	Name string `json:"name"`
	Data string `json:"data"`
}

type Emitter struct {
	connection *amqp.Connection
}

func (e *Emitter) setup() error {
	channel, err := e.connection.Channel()
	if err != nil {
		return err
	}
	defer channel.Close()

	return declareExchange(channel)
}

func (e *Emitter) Push(event string, severity string) error {
	channel, err := e.connection.Channel()
	if err != nil {
		return err
	}
	defer channel.Close()

	log.Println("Pushing to channel")

	err = channel.Publish(
		"logs_topic",
		severity,
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(event),
		},
	)
	if err != nil {
		return err
	}

	return nil
}

func NewEventEmitter(conn *amqp.Connection) (Emitter, error) {
	emitter := Emitter{
		connection: conn,
	}

	err := emitter.setup()
	if err != nil {
		return Emitter{}, err
	}

	return emitter, nil
}

func connect() (*amqp.Connection, error) {
	var counts int64
	var backOff = 1 * time.Second
	var connection *amqp.Connection

	for {
		c, err := amqp.Dial("amqp://guest:guest@ct-rabbitmq")
		if err != nil {
			fmt.Println("RabbitMQ not yet ready ...")
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

func internalRegister(data *logger.Log) {
	emitter, _ := NewEventEmitter(app.Rabbit)

	payload := LogPayload{
		Name: data.Action,
		Data: data.Message,
	}

	payloadJson, _ := json.MarshalIndent(payload, "", "\t")
	log.Println("push to rabbit mq")
	_ = emitter.Push(string(payloadJson), "log.INFO")
}
