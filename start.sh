#!/bin/sh

# sync database
echo "synchronizing db..."
npm run typeorm:sync
# start server
echo "initialize server..."
node dist/index.js