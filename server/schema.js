
const {gql} = require ('apollo-server-express')
const typeDefs = gql`
    type User {
        id:ID!
        username:String!
        email:String!
        password:String!
    }

    type Todo {
      id: ID!
      text: String!
      completed: Boolean!
    }
    type Token {
      token:String!
      user:User!
    }
    type Query {
      todos: [Todo]
      me:User
    }

    type Mutation {
      addTodo(text: String!): Todo
      toggleTodoCompletion(id: ID!): Todo
      deleteTodo(id: ID!): Todo
      signUp(username:String!,email:String!,password:String!):Token
      signIn(email:String,password:String!):Token
      logout:Boolean!
    }

  `;


  module.exports = typeDefs