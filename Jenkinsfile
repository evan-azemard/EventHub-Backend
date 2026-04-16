pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installation des dépendances...'
                sh 'pnpm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Exécution des tests unitaires...'
                sh 'pnpm test'
            }
        }

        stage('Deploy (Optionnel)') {
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