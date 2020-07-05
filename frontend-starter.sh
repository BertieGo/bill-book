#!/usr/bin/env bash

root=$(cd $(dirname $0); pwd)

frontend="${root}/frontend";

function run_frontend() {
  cd ${frontend}
  npm install
  npm run start
}

run_frontend

