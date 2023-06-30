# Streamer Spotlight

Streamer Spotlight is a fullstack app which allows users to see streamers list, uvote or downvote them, see detailed information about particular streamer and add a new one to the list. Everything is saved on database so users have an access to the same list.

**Link to live version** https://streamer-spotlight.onrender.com/

## How To Run It Locally

1. Clone the repo

```sh
git clone https://github.com/pskrzypek97/streamerspotlight.git
```

2. Install NPM packages for the server

```sh
npm install
```

3. Run the server

```sh
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) with your browser to see results.

5. Install NPM packages for the client side

```sh
cd ./client
npm install
```

6. Run the client side

```sh
cd ./client
run start
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see results.

## Endpoints

GET /streamers: returns all streamers
GET /streamer/:id: returns a particular streamer
POST /streamers: send new streamers to save them in the database
PUT /streamers/:id/vote: update particular streamer's likes count

## Tech Used

- React
- Express
- MongoDB
- Jest
