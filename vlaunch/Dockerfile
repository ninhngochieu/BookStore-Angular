FROM node:10.19.0 as node

WORKDIR /app

COPY . /app/

# RUN npm install

# RUN npm run build --prod

RUN yarn install

RUN yarn build 

FROM nginx:alpine

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

COPY --from=node /app/dist/vlaunch /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
