#!/bin/sh
NAME=$1
if [ -z "$1" ]
  then
    echo "sh locale.sh <widget_name>"
    exit
fi

node ./node_modules/@biesbjerg/ngx-translate-extract/bin/cli.js  --clean --sort --format namespaced-json  --marker=_ --input ./src/app/widget-$NAME/ --output ./src/app/widget-$NAME/i18n/{ru,en}.json

