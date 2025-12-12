// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/common/Navigation';  // 👈 import
import Home from './pages/Home.tsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation />  {/* 👈 모든 페이지에 표시됨 */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 나중에 추가할 라우트들 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
