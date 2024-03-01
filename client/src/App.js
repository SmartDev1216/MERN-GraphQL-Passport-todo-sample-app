import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import TodoList from './components/TodoList';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1 className='text-red-500'>TODO App</h1>
        <TodoList />
      </div>
    </ApolloProvider>
  );
};

export default App;