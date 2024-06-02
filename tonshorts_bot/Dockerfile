FROM golang:1.17-alpine3.13

WORKDIR /go/src
COPY . /go/src
COPY . /usr/local/go/src

ENV GOPATH "/go:/go"
RUN go env -w GO111MODULE=on
RUN go mod init telegrammediabot
RUN go mod tidy

RUN apk update
#RUN apk upgrade
RUN apk add --no-cache ffmpeg

RUN go get -d -v ./...

ENTRYPOINT go run main.go