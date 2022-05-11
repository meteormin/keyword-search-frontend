#!/bin/bash

echo "[start deploy react app]"

echo "[pulling repository]"

git pull origin main 2>/dev/null || res=$?

if [ "${res}" = 1 ]; then
  echo "failed, git pull"
  exit 1
else
  echo "success, git pull"
fi

echo "[start backup build]"

cp -r ./build ./build_back 2>/dev/null || res=$?

if [ "${res}" = 1 ]; then
  echo "failed, backup"
  exit 2
else
  echo "success, backup"
fi

npm run build 2>/dev/null || res=$?

echo "[start build react app]"

if [ "${res}" = 1 ]; then
  echo "failed, build"
  exit 3
else
  echo "success, build"
fi

exit 0
