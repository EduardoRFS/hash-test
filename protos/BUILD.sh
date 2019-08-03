#!/usr/bin/env bash

SRC="./src"
DIST="./dist"

mkdir -p ${DIST}

# JavaScript code generating
grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${DIST} \
  --grpc_out=${DIST} \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  -I ${SRC} \
  ${SRC}/*.proto

grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=${DIST} \
  -I ${SRC} \
  ${SRC}/*.proto
