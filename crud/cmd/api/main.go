package main

import (
	"database/sql"
	"log"

	_ "github.com/jackc/pgconn"
	_ "github.com/jackc/pgx/v4"
	_ "github.com/jackc/pgx/v4/stdlib"
)

const port = 50001

type AppConfig struct {
	DB *sql.DB
}

var app *AppConfig

func main() {
	conn := connectToDB()
	if conn == nil {
		log.Panic("Can't connect to DB!")
	}

	app = &AppConfig{
		DB: conn,
	}

	log.Println("listening")
	gRPCListen()
}
