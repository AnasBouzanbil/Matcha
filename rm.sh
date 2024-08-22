#!/bin/bash

# Ports to be checked
PORTS=(3000 4000)

for PORT in "${PORTS[@]}"; do
    # Find and kill processes using the specified port
    PIDS=$(lsof -t -i :$PORT)
    
    if [ -n "$PIDS" ]; then
        echo "Killing processes on port $PORT..."
        kill -9 $PIDS
        echo "Processes on port $PORT have been killed."
    else
        echo "No processes found on port $PORT."
    fi
done



docker rm -f $(docker ps -a )
sleep 1

docker rmi -f $(docker images)
sleep 1

docker volume rm -f $(docker volume ls )
sleep 1

docker network rm -f $(docker network ls )

sleep 1

rm -rf /backend/uploads/*


