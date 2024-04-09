# Mod18-MongoDB-SocialAPI

## Description

MSU Coding Bootcamp Module 18 Challenge: NoSQL Challenge - Social Network API

The purpose of this project was to build from scratch an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. This uses Express.js for routing, a MongoDB database, and the Mongoose ODM. In addition to using the Express.js and Mongoose packages, it also uses the native JavaScript Date object to format timestamps.

## Installation

- Repo: [GitHub Repo](https://github.com/ECiarabellini/Mod18-MongoDB-SocialAPI)
- Video walkthrough: [recording](https://drive.google.com/file/d/1ZfzADA_C17vlaDzm1mDbyKRVJi-NPfp7/view?usp=sharing)

## Usage

To run:

- Run 'npm install' from the command line
- Run 'npm start' to start the server.
- Use Insomnia to test API endpoints.

Create user sample JSON request body:

```json
{
  "username": "EmilyC",
  "email": "emilyc@gmail.com"
}
```

Create thought sample JSON request body:

```json
{
  "thoughtText": "What do you think about this movie...",
  "username": "emily",
  "userId": "6614132c3fe3e69900b634d0"
}
```

Update thought sample JSON request body:

```json
{
  "thoughtText": "What do you think about this movie? It's based on a book. "
}
```

Add Reaction sample JSON request body:

```json
{
  "reactionBody": "Neat!",
  "username": "lernantino"
}
```

## Credits

- I copied folders and file structure from module 18 activity 26, then updated for the requirements of this project
- I relied heavily on ChatGPT to help create models and controllers routes as well as mirroring those in activity 26

## License

MIT License
