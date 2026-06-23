# ===== Build a tiny static-site image served by nginx =====
FROM nginx:alpine

# Remove default config and add our subpath-aware config
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static site
COPY index.html styles.css script.js profile.jpg /usr/share/nginx/html/

EXPOSE 80

# # Basic container healthcheck
# HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
#   CMD wget -qO- http://127.0.0.1/Vannal-SOK/ >/dev/null 2>&1 || exit 1
