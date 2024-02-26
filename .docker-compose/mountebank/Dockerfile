FROM node:19.1.0 
RUN npm install -g mountebank@2.9.1
ENTRYPOINT ["mb"]
CMD ["start", "--configfile", "/imposters.ejs", "--allowInjection"]
COPY *.ejs .
COPY responses/* responses/