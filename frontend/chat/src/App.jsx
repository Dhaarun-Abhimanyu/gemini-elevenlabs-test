import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Chat />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;