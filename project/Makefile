start:
	docker compose up -d

build: protos build_web build_crud build_logger build_consumer
	docker compose build

# build and start
bns: protos build_web build_crud build_logger build_consumer
	docker compose up --build -d

build_web:
	@echo # Building WEB
	cd ../mono-front/web && npm run build

build_crud:
	@echo # Building CRUD
	cd ../crud && env GOOS=linux CGO_ENABLED=0 go build -o crudService ./cmd/api

build_logger:
	@echo # Building LOGGER
	cd ../logger && env GOOS=linux CGO_ENABLED=0 go build -o loggerService .

build_consumer:
	@echo # Building QUEUE CONSUMER
	cd ../queue-consumer && env GOOS=linux CGO_ENABLED=0 go build -o queueConsumerService .

stop:
	docker compose down

test: test_web test_e2e

test_web:
	cd ../mono-front/web && npm run test:nowatch

test_e2e:
	cd ../cypress && npx cypress run -b chrome

protos:
	@echo # Creating protos ..
	cd ../protos && \
	npm install && \
	protoc --js_out=import_style=commonjs,binary:. --grpc_out=grpc_js:. --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin --ts_out=grpc_js:. -I=. todos.proto && \
	protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative todos.proto && \
	protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative logger.proto
	@echo # Removing protos from API
	cd ../mono-front/api/src/todos && \
	rm -f *
	@echo # Moving new protos to API
	find ../protos -type f -name "todos_*.js" -exec cp {} ../mono-front/api/src/todos/ \;
	find ../protos -type f -name "todos_*.d.ts" -exec cp {} ../mono-front/api/src/todos/ \;
	@echo # Removing protos from CRUD
	cd ../crud/todos && \
	rm -f *
	cd ../crud/logger && \
	rm -f *
	@echo # Moving protos to CRUD
	find ../protos -type f -name "todos*.go" -exec cp {} ../crud/todos/ \;
	find ../protos -type f -name "logger*.go" -exec cp {} ../crud/logger/ \;
	find ../protos -type f -name "logger*.go" -exec cp {} ../logger/logger/ \;
	@echo # Cleaning up
	cd ../protos && \
	rm -rf node_modules && \
	rm -f package-lock.json
	find ../protos/* -type f -name "*.js" -exec rm {} \;
	find ../protos/* -type f -name "*.d.ts" -exec rm {} \;
	find ../protos/* -type f -name "*.go" -exec rm {} \;
