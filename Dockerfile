FROM node:22-alpine

ENV NODE_ENV=production PORT=8182
WORKDIR /app

# Yalnızca yayınlanan dosyalar ve sunucu kopyalanır
COPY --chown=root:root server.js package.json ./
COPY --chown=root:root *.html ./
COPY --chown=root:root assets ./assets
COPY --chown=root:root css ./css
COPY --chown=root:root js ./js

USER node
EXPOSE 8182

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8182/ || exit 1

CMD ["node", "server.js", "--no-open"]
