#!/usr/bin/env bash

root=$(cd $(dirname $0); pwd)

frontend="${root}/frontend";

backend="${root}/backend";

function run_frontend() {
  cd ${frontend}
  npm install
  npm run start
}

function run_backend() {
  cd ${backend}
  npm install
  node "./index.js"
}

run_frontend

run_backend
