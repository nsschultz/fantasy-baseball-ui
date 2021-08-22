pipeline {
    agent { label 'builder' }
    environment {
        def props = readJSON file: 'package.json'
        VERSION_NUMBER = props.version
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
                sed -i "s/{{version}}/${VERSION_NUMBER}/g" ./_deploy/ui-deployment.yaml
                kubectl apply -f ./_deploy/ui-deployment.yaml
                kubectl apply -f ./_deploy/ui-service.yaml
                kubectl apply -f ./_deploy/ui-ingress.yaml
            """ } }
        }
    }
}