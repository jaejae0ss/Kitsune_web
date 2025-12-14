// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import ProjectDetail from './pages/Projects/ProjectDetail';
import PostDetail from './pages/Posts/PostDetail'; // 추가
import About from './pages/About/About';
import Profile from './pages/About/Profile';
import Skills from './pages/About/Skills';
import Contact from './pages/About/Contact';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/projects" element={<ProjectDetail />} />
        <Route path="/posts/:postId" element={<PostDetail />} /> {/* 추가 */}
        <Route path="/about" element={<About />} />
        <Route path="/about/profile" element={<Profile />} />
        <Route path="/about/skills" element={<Skills />} />
        <Route path="/about/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
