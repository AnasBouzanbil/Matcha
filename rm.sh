docker rm -f $(docker ps -a )
sleep 1

docker rmi -f $(docker images)
sleep 1

docker volume rm -f $(docker volume ls )
sleep 1

docker network rm -f $(docker network ls )