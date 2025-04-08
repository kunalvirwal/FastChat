# FastChat

FastChat is a lightweight and efficient anonymous chat application designed for seamless real-time communication. It is built with socket.io to ensure a smooth and real time user communication. It allows users to come and create chat rooms and share them with ID and password. These rooms can hold any no of users and can be deleted by its admin.  

This app is also deployed at https://fastchat.kunalvirwal.tech

## 🐳 Run via docker
```
docker run -it -p 8000:80 -e PORT=80 -e SECRET_KEY=<YOUR-SECRET-KEY> -e MONGODB_URI="<YOUR-MONGODB-CONNECTION-URI>" docker.io/kunalvirwal/fastchat:latest
```

## Run via code

1. Clone the repository:
    ```bash
    git clone https://github.com/kunalvirwal/FastChat.git
    ```
2. Navigate to the project directory:
    ```bash
    cd FastChat
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file and add environment variables
    ```
    cp sample.env .env
    ```

4. Start the development server:
    ```bash
    npm start
    ```
5. Visit `http://localhost:8000`

## Technologies Used

- **Frontend**: HTML, CSS, EJS
- **Backend**: Express JS
- **Database**: MongoDB
- **WebSocket**: Socket.IO for real-time communication

