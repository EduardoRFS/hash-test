ENV_NAME=${ENV_NAME:="local"}
ORMCONFIG=dist/src/config/${ENV_NAME}.ormconfig.js

$(yarn bin typeorm) -f $ORMCONFIG $@