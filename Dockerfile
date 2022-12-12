# syntax=docker/dockerfile:1
FROM node:19.1.0 as dev
RUN apt-get update && apt-get install -y --no-install-recommends default-jre
ENV JAVA_HOME=/usr/lib/jvm/default-java \
    SONAR_VERSION=4.5.0.2216
# Need to install sonar to make sure that we can use a version that will run on ARM
# Version needs to match the version that the plugin uses
RUN wget -O sonarqube.zip --no-verbose https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$SONAR_VERSION.zip && \
    unzip sonarqube.zip && \
    rm sonarqube.zip && \
    mkdir -p /root/.sonar/native-sonar-scanner/ && \
    mv sonar-scanner-$SONAR_VERSION /root/.sonar/native-sonar-scanner/sonar-scanner-$SONAR_VERSION-linux
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

FROM dev as build
COPY ["package.json", "package-lock.json", "./"]
RUN --mount=type=cache,id=react,target=/app/node_modules npm ci --silent
COPY . .
RUN --mount=type=cache,id=react,target=/app/node_modules npm run build:default

FROM nginx:1.23.2
WORKDIR /usr/share/nginx/html/
COPY env.sh .
COPY .env .
RUN useradd -u 5000 ng-user && \
    mkdir -p /var/run/nginx /var/tmp/nginx && \
    chown -R ng-user:ng-user /usr/share/nginx /var/run/nginx /var/tmp/nginx
USER ng-user:ng-user
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/
RUN chmod +x ./env.sh
CMD ["/bin/bash", "-c", "./env.sh && nginx -g \"daemon off;\""]
COPY --from=build /app/build .