<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Docker Deployment Guide</title>
    <style>
        body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
        code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
        .section { margin: 30px 0; }
        h1, h2 { color: #333; }
    </style>
</head>
<body>
    <h1>🐳 Docker Deployment Guide</h1>
    
    <div class="section">
        <h2>📋 Overview</h2>
        <p>This guide provides Docker configuration for deploying your Laravel + React authentication application in both development and production environments.</p>
    </div>

    <div class="section">
        <h2>🔧 Development Setup</h2>
        
        <h3>1. Create Dockerfile</h3>
        <pre><code># Dockerfile
FROM php:8.2-fpm as development

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    libzip-dev nodejs npm \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .
RUN composer install --no-dev --optimize-autoloader
RUN npm ci && npm run build

EXPOSE 9000
CMD ["php-fpm"]</code></pre>

        <h3>2. Create docker-compose.yml</h3>
        <pre><code>version: '3.8'

services:
  app:
    build:
      context: .
      target: development
    volumes:
      - .:/var/www/html
      - ./storage:/var/www/html/storage
    environment:
      - APP_ENV=local
      - DB_HOST=mysql
      - DB_DATABASE=laravel
      - DB_USERNAME=root
      - DB_PASSWORD=secret
    depends_on:
      - mysql

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - .:/var/www/html
      - ./docker/nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - app

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: laravel
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

volumes:
  mysql_data:</code></pre>

        <h3>3. Create Nginx Configuration</h3>
        <p>Create <code>docker/nginx.conf</code>:</p>
        <pre><code>server {
    listen 80;
    index index.php index.html;
    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /var/www/html/public;

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
        gzip_static on;
    }
}</code></pre>
    </div>

    <div class="section">
        <h2>🚀 Production Deployment</h2>
        
        <h3>1. Production Dockerfile</h3>
        <pre><code># Production stage
FROM php:8.2-fpm as production

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

WORKDIR /var/www/html

# Copy and install dependencies
COPY composer.json composer.lock package.json package-lock.json ./
RUN composer install --no-dev --optimize-autoloader --no-interaction
RUN npm ci --only=production

# Copy source code
COPY . .

# Build assets and set permissions
RUN npm run build \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 storage bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]</code></pre>

        <h3>2. Production docker-compose.yml</h3>
        <pre><code>version: '3.8'

services:
  app:
    build:
      context: .
      target: production
    environment:
      - APP_ENV=production
      - APP_DEBUG=false
      - DB_HOST=mysql
      - DB_DATABASE=laravel_prod
      - DB_USERNAME=laravel
      - DB_PASSWORD=${DB_PASSWORD}
    depends_on:
      - mysql
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx-prod.conf:/etc/nginx/conf.d/default.conf
      - ./ssl:/etc/nginx/ssl  # For SSL certificates
    depends_on:
      - app
    restart: unless-stopped

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: laravel_prod
      MYSQL_USER: laravel
      MYSQL_PASSWORD: ${DB_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  mysql_data:</code></pre>
    </div>

    <div class="section">
        <h2>⚡ Quick Start Commands</h2>
        
        <h3>Development</h3>
        <pre><code># Start development environment
docker-compose up -d

# Run migrations
docker-compose exec app php artisan migrate

# Run tests
docker-compose exec app php artisan test

# Access application at http://localhost</code></pre>

        <h3>Production</h3>
        <pre><code># Create .env.production file
cp .env.example .env.production

# Build and start production containers
docker-compose -f docker-compose.prod.yml up -d --build

# Run production setup
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate --force
docker-compose exec app php artisan config:cache
docker-compose exec app php artisan route:cache
docker-compose exec app php artisan view:cache</code></pre>
    </div>

    <div class="section">
        <h2>🧪 Testing</h2>
        <p>The application includes comprehensive test coverage:</p>
        
        <pre><code># Run all tests
docker-compose exec app php artisan test

# Run specific test suite
docker-compose exec app php artisan test --testsuite=Feature

# Run tests with coverage
docker-compose exec app php artisan test --coverage</code></pre>

        <p><strong>Test Coverage Includes:</strong></p>
        <ul>
            <li>✅ User authentication (login/logout)</li>
            <li>✅ User registration</li>
            <li>✅ Dashboard access control</li>
            <li>✅ Route protection middleware</li>
            <li>✅ Welcome page functionality</li>
        </ul>
    </div>

    <div class="section">
        <h2>🔧 Environment Configuration</h2>
        
        <h3>Required Environment Variables</h3>
        <pre><code>APP_NAME="Secure Web App"
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel_prod
DB_USERNAME=laravel
DB_PASSWORD=your-secure-password

# Email configuration for user verification
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-email-password</code></pre>
    </div>

    <div class="section">
        <h2>🛠️ Additional Features</h2>
        <ul>
            <li>🔐 Complete authentication system</li>
            <li>📧 Email verification support</li>
            <li>🔄 Password reset functionality</li>
            <li>🎨 Dark/light mode support</li>
            <li>📱 Responsive design</li>
            <li>⚡ Built with modern tech stack (Laravel + React + Inertia.js)</li>
            <li>🧪 Comprehensive test suite</li>
            <li>🐳 Docker-ready for easy deployment</li>
        </ul>
    </div>
</body>
</html>