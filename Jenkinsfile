pipeline {
    agent any
    stages {
        stage("build"){
            steps{
                script {
                    echo "Hola Mundo"
                }
            }
        }
        stage("test"){
            steps{
                script {
                    ipconfig
                }
            }
        }
        stage("deploy"){
            steps{
                script {
                    echo "Hola Mundo"
                }
            }
        }
    }
    post {
        always {
            deleteDir()
            echo "fase always"
        }
        success {
            echo "fase success"
        }
        failure {
            echo "fase fairule"
        }
    }
}
