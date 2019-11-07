#!/bin/sh
NAME=$1
if [ -z "$1" ]
  then
    echo "sh build.sh <widget_name>"
    exit
fi

sh locale.sh $NAME
rm -rf ./dist/*/*
#rm -rf ./build
node ./node_modules/webpack-cli/bin/cli.js --config config/webpack.prod.js --progress --profile --bailnpm  --env.WIDGET_NAME=$NAME
mkdir build
pushd dist
zip -q -r  ../build/$NAME.zip ./*
popd
