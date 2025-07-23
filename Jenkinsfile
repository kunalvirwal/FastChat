node {
    def newImage
    stages{
        stage("Clone repository") {
            checkout scm
        }
        stage("Build Image") {
            newImage = docker.build("kunalvirwal/fastchat")
        }
        stage("Push Image") {
            docker.withRegistry("https://registry.hub.docker.com","dockerhub-creds") {
                newImage.push("${env.BUILD_NUMBER}")
                newImage.push("latest")
            }
        }
    }
    post {
        success {
            slackSend(
                color: 'good',
                message: "Build successful: ${env.JOB_NAME} - ${env.BUILD_NUMBER}\nPushed image to DockerHub."
            )
        }
        failure {
            slackSend(
                color: 'danger',
                message: "Build failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
            )
        }
    }
}