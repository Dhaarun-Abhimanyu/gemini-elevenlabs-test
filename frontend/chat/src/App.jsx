import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SouthPage from './pages/SouthPage'; // Corrected import
import ThreeDModels from './pages/ThreeDModels';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<ThreeDModels />} />
            <Route path="/south" element={<SouthPage />} /> {/* Corrected component name */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;