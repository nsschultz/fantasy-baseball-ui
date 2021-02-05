# syntax=docker/dockerfile:experimental
FROM node:13.12.0 as build
RUN apt-get update && apt-get install -y --no-install-recommends default-jre
ENV JAVA_HOME=/usr/lib/jvm/default-java \
    SONAR_VERSION=4.3.0.2102
# Need to install sonar to make sure that we can use a version that will run on ARM
# Version needs to match the version that the plugin uses
RUN wget -O sonarqube.zip --no-verbose https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$SONAR_VERSION.zip && \
    unzip sonarqube.zip && \
    rm sonarqube.zip && \
    mkdir -p /root/.sonar/native-sonar-scanner/ && \
    mv sonar-scanner-$SONAR_VERSION /root/.sonar/native-sonar-scanner/sonar-scanner-$SONAR_VERSION-linux
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["package.json", "package-lock.json", "./"]
RUN --mount=type=cache,id=react,target=/app/node_modules npm ci --silent
COPY . .
RUN --mount=type=cache,id=react,target=/app/node_modules npm run build:docker

FROM nschultz/base-nginx-runner:1.18.0
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /app/build /usr/share/nginx/html