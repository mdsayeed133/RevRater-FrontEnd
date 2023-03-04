import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/LoginPage/loginPage';
import NavBar from './Components/Navbar/navBar';
import RegisterPage from './Components/RegisterPage/registerPage';

function App() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
      <BrowserRouter>
        <NavBar/>
        <div className='App'>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <div className="button-container">
            <button onClick={scrollToTop}>^</button>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;

