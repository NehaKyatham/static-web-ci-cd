pipeline {
    agent any

    environment {
        IMAGE_NAME = "nehakyatham/static-web"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/NehaKyatham/static-web-ci-cd.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                echo "🔧 Building Docker image..."
                docker build -t $IMAGE_NAME:$IMAGE_TAG .
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                echo "🚀 Starting container for health check..."
                docker run -d --name healthcheck -p 8081:80 $IMAGE_NAME:$IMAGE_TAG

                echo "⏳ Waiting for Nginx to start..."
                sleep 5

                echo "🔍 Performing health check..."
                curl -I http://localhost:8081 || true

                echo "🧹 Cleaning up test container..."
                docker rm -f healthcheck
                '''
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "🔐 Logging in to Docker Hub..."
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh '''
                echo "📤 Pushing Docker image to Docker Hub..."
                docker push $IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }
    }
}

