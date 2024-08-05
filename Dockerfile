FROM node:19.1.0 as dev
RUN npm install -g sonarqube-scanner@4.0.1
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

FROM dev as code
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .

FROM code as ci
RUN npm run ci

FROM code as build
RUN npm run build

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