echo '
cd /code
yarn

cd /code/packages/protos
yarn build

cd /code/packages/utils
yarn build

cd /code/apps/users
yarn migration:run
' | docker run --rm -i --network=hash-test_default -v $PWD:/code node:12 /bin/bash

echo '
cd /code/apps/products
go run migrations/*.go init
go run migrations/*.go up
' | docker run --rm -i --network=hash-test_default -v $PWD:/code golang:1.13-alpine /bin/ash

echo '
cd /code/apps/users
yarn test
' | docker run --rm -i --network=hash-test_default -v $PWD:/code node:12-alpine /bin/ash
