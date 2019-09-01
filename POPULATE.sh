yarn;
yarn deploy;
echo '
cd /code/apps/discounts
ENV_NAME=docker yarn test
' | docker run --rm -i --network=hash-test_default -v $PWD:/code node:12-alpine /bin/ash