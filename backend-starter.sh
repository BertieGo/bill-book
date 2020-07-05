#!/usr/bin/env bash

root=$(cd $(dirname $0); pwd)

backend="${root}/backend";

function run_backend() {
  cd ${backend}
  npm install
  node "./index.js"
}

run_backend
