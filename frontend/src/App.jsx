import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        {/* La Navbar s'affichera sur TOUTES les pages */}
        <Navbar />
        
        {/* Le contenu qui change en fonction de l'URL */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Plus tard on ajoutera : */}
            {/* <Route path="/shop" element={<Shop />} /> */}
            {/* <Route path="/admin" element={<Admin />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;