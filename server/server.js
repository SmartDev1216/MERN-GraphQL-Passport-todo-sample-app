const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const passport = require("passport");
const jwtStrategy = require("./passport");
const cors = require("cors");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use Passport middleware for authentication
app.use(passport.initialize());

// Configure Passport to use JWT strategy
passport.use('jwt', jwtStrategy);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
  startApolloServer();
})
.catch((err) => console.error("Error connecting to MongoDB:", err));

// Start Apollo Server
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: req.user, // Pass user information to the context
      User
    })
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};