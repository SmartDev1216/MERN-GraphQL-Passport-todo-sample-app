const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    startApolloServer();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

const startApolloServer = async () => {
  const typeDefs = gql`
    type Todo {
      id: ID!
      text: String!
      completed: Boolean!
    }

    type Query {
      todos: [Todo]
    }

    type Mutation {
      addTodo(text: String!): Todo
      toggleTodoCompletion(id: ID!): Todo
      deleteTodo(id: ID!): Todo
    }
  `;

  const resolvers = {
    Query: {
      todos: async () => {
        return await Todo.find();
      }
    },
    Mutation: {
      addTodo: async (_, { text }) => {
        const todo = new Todo({ text, completed: false });
        return await todo.save();
      },
      toggleTodoCompletion: async (_, { id }) => {
        const todo = await Todo.findById(id);
        if (!todo) throw new Error('Todo not found');
        todo.completed = !todo.completed;
        return await todo.save();
      },
      deleteTodo: async (_, { id }) => {
        return await Todo.findByIdAndDelete(id);
      }
    }
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Ensure server is started before applying middleware
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};