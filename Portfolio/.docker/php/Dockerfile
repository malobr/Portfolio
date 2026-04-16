FROM php:8.4-fpm

# 1. Instala dependências do Sistema e agora inclui o NODE.JS (v20)
# O comando "curl ... setup_20.x" prepara o sistema para instalar o Node
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update && apt-get install -y \
    nodejs \
    build-essential \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    git \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath fileinfo

# 2. Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Define a pasta de trabalho
WORKDIR /var/www

# 4. Copia arquivos do composer e instala dependências PHP
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# 5. Copia o restante dos arquivos do projeto
COPY . .

# ====================================================
# 6. PARTE NOVA: Instala dependências do React e faz o Build
# Isso vai criar a pasta public/build/manifest.json que está faltando
RUN npm install
RUN npm run build
# ====================================================

# 7. Ajusta permissões
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage \
    && chmod -R 775 /var/www/bootstrap/cache

# 8. Expõe a porta
EXPOSE 8000

# 9. Comando de inicialização
CMD ["sh", "-c", "php artisan storage:link --force && php artisan migrate --seed --force && php artisan serve --host=0.0.0.0 --port=${PORT}"]