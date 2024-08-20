
docker-compose up -d  
sleep 3

cd front 
npm run dev &
sleep 4

cd ../backend 
npm run dev &

wait

echo "All is done"
