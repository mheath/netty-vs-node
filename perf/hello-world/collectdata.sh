#!/bin/sh

SERVER=$1
REQUESTS=$2

for count in 1 2 3 4 5 6 7 8 9 10; do
	echo "On interation $count"
	for i in 1 10 20 30 40 50 60 70 80 90 100 200 300 400 500 600 700 800 900 1000 2000 3000 4000 5000 6000 7000 8000 9000 10000; do
		echo "Running with $i connections"
		
	done
done