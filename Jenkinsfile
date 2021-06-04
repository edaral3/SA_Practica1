pipeline {
    agent any
    stages {
        stage("build"){
            steps{
                bat "cd FRONTEND"
                bat "docker build -t 'practica1:Dockerfile' ."
                bat "cd .."
            }
        }
        stage("test"){
            steps{
                bat "cd PRUEBAS"
                bat "npm install"
                bat "npm test"
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
