#!/usr/bin/env bash

root=$(cd $(dirname $0); pwd)

frontend="${root}/frontend";

backend="${root}/backend";

function build_frontend() {
  cd ${frontend}
  docker run -v $(pwd):/workspace -w /workspace node bash -c "npm install && npm run build"
  docker build -t x-mind/frontend .
}

function build_backend() {
  cd ${backend}
  docker build -t x-mind/backend .
}

function here_we_go() {
  cd ${root}
  docker-compose up -d
}

build_frontend

build_backend

here_we_go
