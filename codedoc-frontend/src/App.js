import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Room from './components/Room';
import Home from './components/Home';

function App() {
  return (
    <Container>
      <Router>
            <Routes>
                <Route path="/room/:roomId" element={<Room/>} />
                <Route path="/" element={<Home/>} />
            </Routes>
      </Router>
    </Container>
  );
}

export default App;
