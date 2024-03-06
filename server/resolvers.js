const User = require("./models/User");
const Todo = require("./models/Todo");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    todos: async () => {

      return await Todo.find();
    },
    me: (_, __, { user }) => user,
  },

  Mutation: {
    addTodo: async (_, { text }) => {
      const todo = new Todo({ text, completed: false });
      return await todo.save();
    },
    toggleTodoCompletion: async (_, { id }) => {
      const todo = await Todo.findById(id);
      if (!todo) throw new Error("Todo not found");
      todo.completed = !todo.completed;
      return await todo.save();
    },
    deleteTodo: async (_, { id }) => {
      return await Todo.findByIdAndDelete(id);
    },

    signUp:async(_,{username,email,password}) => {
       const existingUser = await User.findOne({email});
       if(existingUser){
        throw new Error('User already exists')
       }

       const hashedPassword = await bcrypt.hash(password,10);
       const user = new User({username,email,password:hashedPassword})
       const id =  user.id
       const token = jwt.sign({id:user.id},'secretekey',{expiresIn:'1d'})
       const userData = {id,username,email}
      await user.save()
       return {token:'Bearer '+ token,user:userData}
    },
    signIn:async (_,{email,password}) => {
        const user = await User.findOne({email});
        if(!user) {
            throw new Error('User not found')
        }
        const validPassword = await bcrypt.compare(password,user.password)

        if(!validPassword){
            throw new Error ('Invalid password')
        }
        const id =  user.id
        const token = jwt.sign({id:user.id},'secretekey',{expiresIn:'1d'})
        const userData = {id,username,email}
        return {token:'Bearer '+ token,user:userData}
    }
  },
};

module.exports = resolvers;
