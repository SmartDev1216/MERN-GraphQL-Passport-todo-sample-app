import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache,createHttpLink } from "@apollo/client";
import {setContext} from '@apollo/client/link/context'
import "./styles/tailwind.css"
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
})

const authLink = setContext((_,{headers})=>{
  const token = localStorage.getItem('token')

  return {
    headers:{
      ...headers,
      Authorization:token?token:"",
    }
  }
})
const client = new ApolloClient({
  link:authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
