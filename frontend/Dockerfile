FROM nginx:latest

# Expost port 80
EXPOSE 80

# Copy custom configuration file from the current directory
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy static assets into var/www
COPY ./build /var/www

# Start up nginx server
CMD ["nginx"]
