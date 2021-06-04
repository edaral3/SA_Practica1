import groovy.json.JsonSlurperClassic

def jsonParse(def json){
    new groovy.json.JsonSlurperClassic().parseText(json)
}
pipeline {
    agent { label 'master' }
    enviroment {
        appName = "variable"
    }
    stages {
        stage("build"){
            steps{
                script {
                    sh "ipconfig"
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
        fairule {
            sh "echo 'fase fairule'"
        }
    }
}
