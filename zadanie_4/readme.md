# WEBTE2 Zadanie 4

## Použité externé API

Open-Meteo | https://api.open-meteo.com | Aktuálna predpoveď počasia\n
Frankfurter | https://api.frankfurter.app | Aktuálne kurzy mien
GeoNames Flags | https://www.geonames.org/flags | Vlajky krajín

## Postup nasadenia

### Závislosti
- PHP 8.4
- MySQL / MariaDB
- Node.js 18+
- Composer
- Nginx

### Backend (Laravel)
```bash
composer install --no-dev --optimize-autoloader --ignore-platform-req=ext-dom
cp .env.example .env
# Upraviť .env — DB credentials, APP_KEY, APP_URL
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force
chmod -R 777 storage/ bootstrap/cache/
```

### Frontend (React + Vite)
```bash
npm install
npm run build
```

### Nginx zmena konfigurácie

location /zadanie_4/api/ {
    rewrite ^/zadanie_4/api/(.*)$ /api/$1 break;
    fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
    fastcgi_param SCRIPT_FILENAME /var/www/node75.webte.fei.stuba.sk/zadanie_4/src/public/index.php;
    fastcgi_param SCRIPT_NAME /index.php;
    fastcgi_param REQUEST_URI /api/$1$is_args$args;
    fastcgi_param QUERY_STRING $query_string;
    fastcgi_param REQUEST_METHOD $request_method;
    fastcgi_param CONTENT_TYPE $content_type;
    fastcgi_param CONTENT_LENGTH $content_length;
    fastcgi_param SERVER_NAME $server_name;
    fastcgi_param SERVER_PORT $server_port;
    fastcgi_param SERVER_PROTOCOL $server_protocol;
    fastcgi_param HTTPS on;
}

location /zadanie_4/ {
    alias /var/www/node75.webte.fei.stuba.sk/zadanie_4/src/public/;
    index index.html;
    try_files $uri $uri/ index.html;
}
