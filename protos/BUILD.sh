FILES=$(find src | grep ".proto")

mkdir -p dist
pbjs -t static-module -w commonjs -o dist/index.js ${FILES}
pbts -o dist/index.d.ts dist/index.js
