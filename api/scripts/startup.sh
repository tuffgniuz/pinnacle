#!/bin/bash
cd /app || exit

figlet "Waiting for postgres..."

while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 0.1
done

echo -e "\e[32m******* Postgres is ready! *******\e[0m"

figlet "Serving Project Service"

exec uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
