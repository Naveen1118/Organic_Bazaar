# Use NGINX to serve Angular files
FROM nginx:alpine

# Copy built Angular files to NGINX's HTML directory
COPY dist/online-bazaar /usr/share/nginx/html

# Expose the NGINX port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
