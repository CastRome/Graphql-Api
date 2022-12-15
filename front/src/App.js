import './App.css';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from '@apollo/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Info from './components/Info';
import DisplayCharacters from './components/DisplayCharacters';
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="App">
                <DisplayCharacters />
              </div>
            }
          />
          <Route exact path="/info" element={<Info />}>
            <Route path=":id" element={<Info />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
