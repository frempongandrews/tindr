<h1 align="center">Tindr - A Tinder Clone</h1>

Features:

- Authentication System with JWT and cookies
- Swipe and Match with other users
- User Profile Creation and Updates (including Image Upload)
- Real-time Messaging and Notifications

### Setup .env file

```bash
PORT=5000
MONGO_URI="your-mongo-db-atlas-uri-here"

JWT_SECRET="your-jwt-secret-here"

NODE_ENV=development
CLIENT_URL=http://localhost:5173

CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"

```

### Run this app locally

- Set `NODE_ENV=production` and build the app

To build the client run

```shell
npm run build
```

### Start the app

```shell
npm run start
```
