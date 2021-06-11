pipeline { //En este apartado se definen las instrucciones del pipeline
    agent any //Permite que cualquier agente pueda ejecutar el pipeline
    stages {  //Permite agregar los jobs que se ejecutaran el en pipeline
        stage("build"){ //Job a ejecutar en le cual se puede definir el nombre que tendra el job
            steps{ //En este apartado se definen los comandos que se ejecutaran al ejecurtarse el job
                bat """
                    cd FRONTEND
                    sudo docker build -t sapractica2 .
                    sudo docker login -u edaral3 -p 123456789
                    sudo docker tag sapractica2 edaral3/sapractica2:latest
                    sudo docker push edaral3/sapractica2:latest
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
                bat "python fabric.py"
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
