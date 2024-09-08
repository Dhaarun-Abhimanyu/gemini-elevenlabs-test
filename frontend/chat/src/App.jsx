import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SouthPage from './pages/SouthPage';
import ThreeDModels from './pages/ThreeDModels';
import Heroes from './pages/hero';
import Timeline from './pages/Timeline';
import LoadingScreen from './pages/LoadingScreen';
function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoadingScreen />} />
            <Route path="/threedmodel" element={<ThreeDModels />} />
            <Route path="/south" element={<SouthPage />} />
            <Route path="/characters" element={<Heroes/>}/>
            <Route path="/timeline" element={<Timeline/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;