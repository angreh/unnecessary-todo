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
	"google.golang.org/protobuf/types/known/anypb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
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

	query := `select id,title,type,status,created_at from todos order by id desc`

	rows, err := app.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	logIt("getall_todos", "request to all todos")

	var todosArr []*todos.Todo

	for rows.Next() {
		var todo todos.Todo
		var id int64
		var createdAt time.Time
		err := rows.Scan(
			&id,
			&todo.Title,
			&todo.Type,
			&todo.Status,
			&createdAt,
		)

		if err != nil {
			log.Println("Error scanning", err)
			return nil, err
		}

		wrapper := wrapperspb.Int64(id)
		anyValue, err := anypb.New(wrapper)
		if err != nil {
			log.Println("Error assigning ID", err)
			return nil, err
		}

		todo.Id = anyValue
		todo.CreatedAt = timestamppb.New(createdAt)

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
	query := `insert into todos (title,type,status,created_at) values ($1,$2,$3,$4) returning id`

	err := app.DB.QueryRowContext(ctx, query,
		req.Todo.Title,
		req.Todo.Type,
		req.Todo.Status,
		time.Now(),
	).Scan(&newId)
	if err != nil {
		return nil, err
	}

	logIt("insert_todo", fmt.Sprintf("new todo %s inserted", req.Todo.Title))

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
