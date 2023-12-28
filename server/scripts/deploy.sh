#!/usr/bin/env bash

mvn clean package

echo 'Copy files...'

scp -i ~/.ssh/id_rsa target/server-0.0.1-SNAPSHOT.jar root@87.249.49.153:/root

echo 'Restart server...'

ssh -i ~/.ssh/id_rsa root@87.249.49.153 << EOF
pkill -f "java -jar server-0.0.1-SNAPSHOT.jar"
EOF

pgrep java | xargs kill -9
nohup java -jar server-0.0.1-SNAPSHOT.jar > log.txt &

EOF

echo 'Bye'
