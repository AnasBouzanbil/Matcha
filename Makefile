

rm:
	docker rm -f $(docker ps -a )
	docker rmi -f $(docker images)
	docker volume rm -f $(docker volume ls )
	docker network rm -f $(docker network ls )

