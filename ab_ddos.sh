#!/bin/bash
while true
do
	ab -kc 20 -n 10000000 $1	
done