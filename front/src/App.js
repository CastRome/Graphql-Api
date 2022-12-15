import './App.css';
import { Routes, Route } from 'react-router-dom';
import Info from './pages/Info';
import DisplayCharacters from './components/DisplayCharacters';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<DisplayCharacters />} />
      <Route exact path="/info" element={<Info />}>
        <Route path=":id" element={<Info />} />
      </Route>
    </Routes>
  );
};

export default App;
