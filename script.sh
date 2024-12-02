./rm.sh

sudo docker compose up -d  
sleep 3


pkill -f "npm run dev"\
pkill -f "npm run dev"

pkill -9 4000
pkill -9 3000

cd front 
npm run dev &
sleep 4

cd ../backend 
npm run dev &

wait

echo "All is done"
