# Chatos! - chat app based on socket.io

## Introduction

After I finished Cyber4s course as FullStack developer, I've decided to turn my Firebase [chat app](https://github.com/OmerBotbol/chat-app) to independent app based on React in client-side and Nodejs in server-side. I changed Firebase authentication to JWT authentication, Firebase database to MySQL database, Firebase storage to AWS S3 storage and finally, my main goal, use socket.io to create live chat!

## Technologies

1. React - client-side
2. Nodejs - server-side
3. Express
4. MySQL (with Sequelize)
5. socket.io
6. S3
7. JWT

## Local hosting

1. Fork this repository
2. Clone it to your computer
3. Create .env file in the server folder
4. Add the following variables that will match to your file:

   - PORT= **not 3000**
   - CHAT_PORT= **not 3000**
   - DB_PASSWORD= ""
   - DATABASE= "" (Database name in MySQL)
   - REFRESH_TOKEN= "" 
   - ACCESS_TOKEN= ""
   - ID= "" (Access key ID from AWS)
   - SECRET= "" (Secret access key from AWS)
   - BUCKET_NAME= "" (Bucket name in AWS)

5. Install project dependencies by running `npm i` in the server & client folders
6. Open new terminal, Go to the server folder and run `npm db` and then `npm start`
7. Open another terminal, Go to the server folder and run `npm socket` (to open chat server)
8. Finally open another terminal, go to the client folder and run `npm start` and the application should open automatically in your browser (if not, open http://localhost:3000)
