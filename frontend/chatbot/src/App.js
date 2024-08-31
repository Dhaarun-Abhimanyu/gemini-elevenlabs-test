import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Chat from './pages/Chat'
import Navbar from './components/Navbar'

function App() {
  return (
    <div classname="App">
      <BrowserRouter>
        <Navbar />
        <div classname="pages">
          <Routes>
            <Route
              path="/"
              element={<Chat />}
            />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App