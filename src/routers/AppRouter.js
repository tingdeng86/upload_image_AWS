// AppRouter

// Development Components
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
// Pages
import PageHome from '../pages/PageHome';
import PageSignup from '../pages/PageSignup';
import PageLogin from '../pages/PageLogin';


function AppRouter() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
            <Routes>
              <Route path="/" element={<PageHome />} />
              <Route path="/signup" element={<PageSignup />} />
              <Route path="/login" element={<PageLogin />} />
            </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;