import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/footer';
import HomePage from './Components/HomePage/homePage';
import LoginPage from './Components/LoginPage/loginPage';
import NavBar from './Components/Navbar/navBar';
import RegisterPage from './Components/RegisterPage/registerPage';
import UserProfile from './Components/UserProfile/userProfile';

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
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/user-picfile" element={<UserProfile/>}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <div className="button-container">
            <button onClick={scrollToTop}>^</button>
          </div>
        </div>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;

