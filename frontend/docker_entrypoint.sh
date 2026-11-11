#!/bin/sh

if [[ ! -d node_modules ]]; then
    npm install
fi
echo "Corriendo servicio"
npm run start -- --host