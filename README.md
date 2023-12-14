# Laravel Vue.js Demo App with Websockets

## Introduction
This project is a demo application built using Laravel 9 and Vue.js 3, featuring websockets and Laravel notifications. It demonstrates real-time notifications using Laravel WebSockets by BeyondCode, a free alternative to Pusher.

## Technologies
- **Backend:** Laravel 9
- **Frontend:** Vue.js 3 with Inertia support
- **UI Framework:** Quasar (for layout)
- **Real-Time Communication:** Laravel WebSockets by BeyondCode

## Installation

To set up the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies:
   1. `composer install`
4. Compile assets:
   1. `npm install`
   2. `npm run dev`
5. Generate an application key
   1. `php artisan key:generate`
6. Run migrations and seed the database
   1.` php artisan migrate --seed`
7. Set the necessary environment variables for websockets in your `.env` file

```sh
PUSHER_APP_ID=some-random-value (e.g dd129e50f7c94e1786)
PUSHER_APP_KEY=some-random-value (e.g 4e1786951ea7f588e70a)
PUSHER_APP_SECRET=some-random-value (e.g sec-fc6ec942dca153a3fac9b80a15)
PUSHER_HOST=127.0.0.1
PUSHER_PORT=6001
PUSHER_SCHEME=http
PUSHER_APP_CLUSTER=mt1
PUSHER_ENCRYPTED=false
```


8. Start the WebSocket server
   1. `php artisan websocket:serve`



## Usage

The application seeds two default companies: **Company 1** and **Company 2**. To test real-time notifications:

1. Open the application in two different browsers or browser sessions.
2. Log in as different users associated with either **Company 1** or **Company 2**.
3. Notifications will be sent in real-time to users belonging to the same company.

## Contributing

Feel free to fork the repository, make changes, and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

