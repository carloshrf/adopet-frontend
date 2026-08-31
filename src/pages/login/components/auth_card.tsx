import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { AuthInput } from './auth_input';
import { AuthButton } from './auth_button';

export const AuthCard: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [showLoginPw, setShowLoginPw] = useState<boolean>(false);
  const [showRegisterPw, setShowRegisterPw] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-emerald-100 border border-emerald-50">
      <div>
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => {
              setTab('login');
            }}
            className={`flex-1 py-4 text-sm font-medium transition-all ${
              tab === 'login'
                ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/40'
                : ''
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => {
              setTab('register');
            }}
            className={`flex-1 py-4 text-sm font-medium transition-all ${
              tab === 'register'
                ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/40'
                : ''
            }`}
          >
            Criar conta
          </button>
        </div>

        <div className="p-7">
          {tab === 'login' ? (
            <form>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder-gray-300"
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1.5">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    className="absolute right-3.5 top-1/2 cursor-pointer -translate-y-1/2 text-gray-400"
                    onClick={() => setShowLoginPw(!showLoginPw)}
                  >
                    {showLoginPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder-gray-300"
                    type={showLoginPw ? 'text' : 'password'}
                    placeholder="*************"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <AuthButton label="Entrar" />
            </form>
          ) : (
            <div className="space-y-4">
              <div className="">
                <AuthInput
                  label="Nome completo"
                  name='name'
                  icon={User}
                  placeholder="João da Silva"
                />
              </div>
              <div className="">
                <AuthInput
                  label="Email"
                  icon={Mail}
                  placeholder="seu@email.com"
                />
              </div>
              <div className="">
                <AuthInput
                  showPassword={showRegisterPw}
                  showPasswordHandler={setShowRegisterPw}
                  type="password"
                  label="Senha"
                  minLength={6}
                  icon={Lock}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div className="">
                <AuthInput
                  type="password"
                  label="Confirmar senha"
                  minLength={6}
                  icon={Lock}
                  placeholder="******"
                />
              </div>
              <AuthButton label="Criar conta" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
