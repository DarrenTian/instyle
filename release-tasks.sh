npm install --dev
webpack --mode production --env.PROD_ENV=PROD ./frontend/src/index.js --output ./staticfiles/main.js
python manage.py makemigrations
python manage.py migrate