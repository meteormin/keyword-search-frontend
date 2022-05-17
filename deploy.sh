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

if [ ! -d "./build" ]; then
  echo 'Does not exists build'
else
  cp -r ./build ./build_back 2>/dev/null || res=$?

  if [ "${res}" = 1 ]; then
    echo "failed, backup"
    exit 2
  else
    echo "success, backup"
  fi
fi

echo "[install new package]"

yarn 2>/dev/null || res=$?

if [ "${res}" = 1 ]; then
  echo "failed, install package"
  exit 2
else
  echo "success, install package"
fi

echo "[start build react app]"

npm run build 2>/dev/null || res=$?

if [ "${res}" = 1 ]; then
  echo "failed, build"
  exit 3
else
  echo "success, build"
fi

echo "copy ./build >> /var/www/front"

cp -r ./build /var/www/front 2>/dev/null || res=$?

if [ "${res}" = 1 ]; then
  echo "failed copy build directory"
  exit 4
else
  echo "success copy!"
fi

exit 0
