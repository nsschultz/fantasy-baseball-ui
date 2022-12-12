FROM node:19.1.0 
RUN npm install -g mountebank
ENTRYPOINT ["mb"]
CMD ["start", "--configfile", "/imposters.ejs", "--allowInjection"]
COPY *.ejs .
COPY responses/* responses/