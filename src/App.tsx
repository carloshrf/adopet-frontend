import './styles/index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/login.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';

function App() {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    // </BrowserRouter>
  );
}

export default App;
