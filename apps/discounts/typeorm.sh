ENV_NAME=${ENV_NAME:="local"}
ORMCONFIG=dist/src/config/${ENV_NAME}.ormconfig.js

yarn build
$(yarn bin typeorm) -f $ORMCONFIG $@