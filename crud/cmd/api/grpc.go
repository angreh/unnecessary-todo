package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"time"
	"todos-crud/logger"
	"todos-crud/todos"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type TodoServer struct {
	todos.UnimplementedTodoServiceServer
}

func gRPCListen() {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("fail to listen for gRPC: %s", err)
	}

	server := grpc.NewServer()

	todos.RegisterTodoServiceServer(server, &TodoServer{})

	log.Printf("gRPC Server started on port %d", port)

	if err := server.Serve(lis); err != nil {
		log.Fatalf("fail to listen for gRPC: %s", err)
	}
}

func (t *TodoServer) GetAll(ctx context.Context, req *todos.GetAllRequest) (*todos.GetAllResponse, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Second*3)
	defer cancel()

	query := `select title from todos order by id desc`

	rows, err := app.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	logIt("getall_todos", "request to all todos")

	var todosArr []*todos.Todo

	for rows.Next() {
		var todo todos.Todo
		err := rows.Scan(
			&todo.Title,
		)
		if err != nil {
			log.Println("Error scanning", err)
			return nil, err
		}

		todosArr = append(todosArr, &todo)
	}

	return &todos.GetAllResponse{
		Todos: todosArr,
	}, nil
}

func (t *TodoServer) Insert(ctx context.Context, req *todos.InsertRequest) (*todos.InsertResponse, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Second*3)
	defer cancel()

	log.Println("hmm")

	var newId int32
	query := `insert into todos (title) values ($1) returning id`

	err := app.DB.QueryRowContext(ctx, query, req.Title).Scan(&newId)
	if err != nil {
		return nil, err
	}

	logIt("insert_todo", fmt.Sprintf("new todo %s inserted", req.Title))

	return &todos.InsertResponse{
		Success:    "true",
		InsertedId: newId,
	}, nil
}

func logIt(action, message string) {
	conn, _ := grpc.Dial(
		"ct-logger:50002",
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock(),
	)
	defer conn.Close()

	client := logger.NewLoggerServiceClient(conn)
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*3)
	defer cancel()

	_, _ = client.Register(ctx, &logger.RegisterRequest{
		Log: &logger.Log{
			Name:    "todo-app",
			Action:  action,
			Message: message,
		},
	})
}
