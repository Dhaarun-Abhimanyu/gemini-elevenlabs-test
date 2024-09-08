import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SouthPage from './pages/SouthPage';
import ThreeDModels from './pages/ThreeDModels';
import Heroes from './pages/hero';
function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<ThreeDModels />} />
            <Route path="/south" element={<SouthPage />} />
            <Route path="/characters" element={<Heroes/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;