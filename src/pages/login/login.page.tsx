import { useNavigate } from 'react-router-dom';
import { AuthCard } from './components/auth_card';
import './login.page.css';

import { Heart, PawPrint } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.SubmitEvent): void => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-4 inline-flex justify-center items-center bg-emerald-500 h-20 w-20 rounded-3xl shadow-lg shadow-emerald-200">
            <PawPrint color="white" className="w-10 h-10" />
          </div>

          <h1 style={{ color: '#065f46' }}>Adopet</h1>
          <p style={{ color: '#059669' }} className="mt-2">
            cuidando dos seus pets com carinho
          </p>
        </div>

        <AuthCard handleLogin={handleLogin} />

        <p className="top-center mt-6 text-xs text-gray-400 flex items-center justify-center gap-1">
          Feito com <Heart className="w-3 h-3 text-red-400" /> para os amantes
          de pets · 2026
        </p>
      </div>
    </div>
  );
};
