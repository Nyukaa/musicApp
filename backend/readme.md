/backend

npm init -y
npm install express cors доступ с фронта
Запустить: npm start

npm install express mongoose cors dotenv
npm install bcrypt jsonwebtoken
npm install nodemon --save-dev авто-перезапуск
npm install mongoose bcrypt jsonwebtoken

/frontend
Установка: npm install vexflow
npm install pitchy@4.1.0
npm install tone pitchy

npm install axios

Проверка
POST http://localhost:3001/api/users
{
"username": "anna",
"password": "secret123"
}

POST http://localhost:3001/api/login

{
"username": "anna",
"password": "secret123"
}

Ответ:

{
"token": "eyJ6...",
"username": "anna"
}
