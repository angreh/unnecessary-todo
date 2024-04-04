package main

import (
	"database/sql"
	"log"
	"time"
)

func openDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func connectToDB() *sql.DB {
	var counts int64

	// dsn := os.Getenv("DSN")
	dsn := "host=ct-postgres port=5432 user=postgres password=password dbname=todos sslmode=disable timezone=UTC connect_timeout=5"

	for {
		connection, err := openDB(dsn)
		if err != nil {
			log.Println("Postgre not yet ready ...")
			counts++
		} else {
			log.Println("Connected to Postgress!")
			return connection
		}

		if counts > 15 {
			log.Println(err)
			return nil
		}

		log.Println("Backing off for 2 seconds ...")
		time.Sleep(2 * time.Second)
		continue
	}
}
