// 젠킨스 파이프라인 플러그인을 호출하기 위한 블록
pipeline {
    // 파이프라인을 실행하고 싶은 위치 정의
    agent none
    // gitlab 소스를 jenkins 디렉토리로 내려받는 경우
    // true인 경우 내려받는 프로세스 스킵
    // false인 경우 gitlab 소스 체크
    // stage 모음
    stages {
        // 실제 작업이 수행되는 블록
        // 해당 stage 명으로 jenkins 화면에 표시된다.
        stage('Build and Test') {
            // docker image에 명시된 image를 활용하여 steps 수행
            agent {
                docker {
                    image 'gradle:7.0.0-jdk11'
                    args '-v /root/.m2:/root/.m2'
                }
            }
            options {skipDefaultCheckout(false)}
            steps {
                sh 'gradle -b ./backend/build.gradle'
            }
        }
        stage('Docker build') {
            agent any
            steps {
                sh 'docker build -t latest_backend:latest /var/jenkins_home/workspace/caterpie/backend'
                sh 'docker build -t latest_frontend:latest /var/jenkins_home/workspace/caterpie/frontend'
            }
        }
        stage('Docker run') {
            agent any
            steps {
                sh 'docker ps -f name=latest_backend -q \
                    | xargs --no-run-if-empty docker container stop'
                sh 'docker ps -f name=latest_frontend -q \
                    | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -f name=latest_backend -q \
                    | xargs -r docker container rm'
                sh 'docker container ls -a -f name=latest_frontend -q \
                    | xargs -r docker container rm'
                sh 'docker images -f dangling=true && \
                    docker rmi $(docker images -f "dangling=true" -q)' 
                sh 'docker run -d --name latest_backend \
                    -p 8080:8080 \
                    -v /home/ubuntu/videos:/videos \
                    --network caterpie \
                    latest_backend:latest'
                sh 'docker run -d --name latest_frontend \
                    -p 80:80 \
                    -p 443:443 \
                    -v /home/ubuntu/videos:/videos \
                    -v /home/ubuntu/sslkey/:/var/jenkins_home/workspace/caterpie/sslkey/ \
                    --network caterpie \
                    latest_frontend:latest'
            }
        }
    }
}