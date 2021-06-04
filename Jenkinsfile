pipeline { //En este apartado se definen las instrucciones del pipeline
    agent any //Permite que cualquier agente pueda ejecutar el pipeline
    stages {  //Permite agregar los jobs que se ejecutaran el en pipeline
        stage("build"){ //Job a ejecutar en le cual se puede definir el nombre que tendra el job
            steps{ //En este apartado se definen los comandos que se ejecutaran al ejecurtarse el job
                bat """
                    cd FRONTEND
                    docker build -t \"sapractica1:latest\" .    
                    cd ..
                """
            }
        }
        stage("test"){
            steps{
                bat """
                    cd PRUEBAS
                    npm install
                """
                bat """
                    cd PRUEBAS
                    npm test
                """
            }
        }
        stage("deploy"){
            steps{
                bat "docker stop sapractica1"
                bat "docker rm sapractica1"
                bat "docker run -d -p 3000:3000 --name sapractica1 -it sapractica1:latest"
            }
        }
    }
    post { //
        always { //Este es un job que siempre se ejecuta al finalizar el pipeline
            deleteDir()
            echo "fase always"
        }
        success { //Se ejecuta al momento que el pipeline finaliza de forma correcta 
            echo "fase success"
        }
        failure { //Se ejecuta si el pipeline falla en algun job  
            echo "fase fairule"
        }
    }
}
