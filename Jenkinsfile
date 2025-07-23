node {
    def newImage
    try {
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
        slackSend(
            color: 'good',
            message: "${env.JOB_NAME} #${env.BUILD_NUMBER}\nJob successfull!!: Pushed image to DockerHub. cc <@kunalvirwal>"
        )
    } catch (e) {
        slackSend(
            color: 'danger',
            message: "${env.JOB_NAME} #${env.BUILD_NUMBER}\nBuild failed!? with the error: ${e} <@kunalvirwal>"
        )
    }
}