pipeline {
    agent any
    
    stages {
        
        stage('Test & Build in Docker') {
            steps {
                script {
                    docker.image('node:20').inside('-u root') {
                        echo 'Environnement Node.js'
                        
                        sh 'npm install -g pnpm'
                        
                        sh 'pnpm install'
                        
                        sh 'pnpm test'

                        sh 'pnpm build'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Déploiement en cours...'
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
        success {
            echo 'Félicitations ! Le code est stable et les tests passent.'
        }
        failure {
            echo 'ALERTE : Les tests ont échoué, le déploiement a été annulé.'
        }
    }
}