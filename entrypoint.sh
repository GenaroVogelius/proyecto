#!/bin/bash

# Exit on error
set -e

# Wait for PostgreSQL
echo "Waiting for PostgreSQL..."
while ! nc -z $POSTGRES_HOST 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# Wait for Redis
echo "Waiting for Redis..."
while ! nc -z redis 6379; do
  sleep 0.1
done
echo "Redis started"

# Run migrations
cd /workspace/backend

# Run migrations
echo "Running migrations..."
python manage.py migrate

# Start the development server
echo "Starting development server..."
exec "$@" 