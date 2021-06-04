pipeline {
    agent any
    stages {
        stage("build"){
            steps{
                bat """
                    cd FRONTEND
                    dir
                    cd ..
                """
            }
        }
        stage("test"){
            steps{
                bat """
                    cd PRUEBAS
                    dir
                    npm install
                    npm test
                """
            }
        }
        stage("deploy"){
            steps{
                bat "docker run -d -p 3000:3000 --name sapractica1 -it sapractica1:latest"
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
