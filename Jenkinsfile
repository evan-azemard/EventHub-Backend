pipeline {
    agent any

    tools {
        nodejs "node" 
    }

    stages {
        
        stage('Setup PNPM') {
            steps {
                echo 'Installation de pnpm...'
                sh 'npm install -g pnpm'
                sh 'pnpm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Exécution des tests unitaires...'
                sh 'pnpm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Lancement de l’application...'
                sh 'pnpm start'
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
    }
}