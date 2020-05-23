# FROM node:10.13 as node
# ENV NODE_ENV production
# WORKDIR /app
# COPY . .
# RUN npm install
# CMD [ "bash" ]
# # RUN npm run build


FROM nginx:alpine
COPY /dist/banana-webapp /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
