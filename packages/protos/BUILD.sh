SRC="./src"
DIST="./dist"
PATH="$PATH:./bin"

# Find protoc
PROTOC="./node_modules/grpc-tools/bin/protoc"
if test ! -f "$PROTOC"; then
  PROTOC="../../node_modules/grpc-tools/bin/protoc"
fi

mkdir -p ${DIST}

# JavaScript + TypeScript
grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${DIST} \
  --grpc_out=${DIST} \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  -I ${SRC} \
  ${SRC}/*.proto ${SRC}/**/*.proto

grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=${DIST} \
  -I ${SRC} \
  ${SRC}/*.proto ${SRC}/**/*.proto

for i in $(find ${SRC} -name \*.proto); do #
  $PROTOC \
    --go_out=plugins=grpc,paths=import:${DIST} \
    -I ${SRC} \
    $i
done
