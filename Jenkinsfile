pipeline {
    agent { label 'builder' }
    environment {
        VERSION_NUMBER = '0.6.1'
        IMAGE_VERSION = "${GIT_BRANCH == "main" ? VERSION_NUMBER : VERSION_NUMBER+"-"+GIT_BRANCH}"
        DOCKER_HUB = credentials("dockerhub-creds")
    }
    stages {
        stage('build and publish') { 
            steps { script { sh  """
                #!/bin/bash
                docker build -t nschultz/fantasy-baseball-ui:${IMAGE_VERSION} .
                docker login -u ${DOCKER_HUB_USR} -p ${DOCKER_HUB_PSW}
                docker push nschultz/fantasy-baseball-ui:${IMAGE_VERSION}
                docker logout
            """ } } 
        }
        stage('deploy') { 
            when { branch 'main' }
            agent { label 'manager' }
            steps { script { sh """
                #!/bin/bash
                export ui_version=0.6.1
                sed -i "s/{{version}}/$ui_version/g" ./_deploy/ui-deployment.yaml
                kubectl apply -f ./_deploy/ui-deployment.yaml
                kubectl apply -f ./_deploy/ui-service.yaml
                kubectl apply -f ./_deploy/ui-ingress.yaml
            """ } }
        }
    }
}