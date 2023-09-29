FROM paketobuildpacks/npm-start
ADD . /app
WORKDIR /app
RUN npm install
CMD ["npm", "start"]