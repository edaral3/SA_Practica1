pipeline {
    agent any
    stages {
        stage("build"){
            steps{
                script {
                    sh "echo 'Hola Mundo'"
                }
            }
        }
    }
    post {
        always {
            deleteDir()
            sh "echo 'fase always'"
        }
        success {
            sh "echo 'fase success'"
        }
        failure {
            sh "echo 'fase fairule'"
        }
    }
}
