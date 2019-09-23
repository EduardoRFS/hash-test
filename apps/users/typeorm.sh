ORMCONFIG=dist/src/config/ormconfig.js

yarn build
$(yarn bin typeorm) -f $ORMCONFIG $@