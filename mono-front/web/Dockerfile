FROM httpd:2.4


RUN npm install

EXPOSE 3000

COPY . .

RUN npm run build

CMD ["npm", "start"]