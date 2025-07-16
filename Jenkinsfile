node {
    def newImage
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