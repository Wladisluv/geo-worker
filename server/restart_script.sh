pgrep java | xargs kill -9
nohup java -jar /home/geo/server-0.0.1-SNAPSHOT.jar > /home/geo/log.txt &
