FROM node:18-alpine AS builder

LABEL maintainer="tu-email@example.com"
LABEL description="Alojapp Angular Frontend"

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --silent --no-audit --no-fund

COPY . .

RUN npm run build -- --configuration=production

FROM nginx:1.25-alpine

COPY --from=builder /app/dist/alojapp-angular-complete /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]