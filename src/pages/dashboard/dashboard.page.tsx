import {
  LayoutGrid,
  LogOut,
  Menu,
  PawPrint,
  Plus,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';

export type Section = 'pets' | 'add-pet' | 'edit-pet' | 'users';

// const mockPets =

export const DashboardPage: React.FC = () => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [section, setSection] = useState<Section>('pets');
  const [editingPet, setEditingPet] = useState<boolean>(false);

  // const visiblePets =
  const navItems = [
    {
      id: 'pets' as Section,
      label: 'Meus Pets',
      icon: LayoutGrid,
      count: '123',
    },
    {
      id: 'users' as Section,
      label: 'Usuários',
      icon: Users,
      count: '456',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {sideBarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSideBarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 z-30 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ${sideBarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-200">
            <PawPrint className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 leading-tight">Adopet</p>
            <p className="text-xs text-gray-400">Gestão de pets</p>
          </div>
          <button
            className="lg:hidden text-gray-400 hover:text-gray-600"
            onClick={() => setSideBarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              section === item.id ||
              ((section === 'add-pet' || section === 'edit-pet') &&
                item.id === 'pets');

            return (
              <button
                key={item.id}
                onClick={() => {
                  setSection(item.id);
                  setSideBarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <item.icon
                  className="w-4.5 h-4.5 flex-shrink-0"
                  style={{ width: '18px', height: '18px' }}
                />
                <span className="flex-1 text-left text-sm">{item.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}

          <div className="pt-3">
            <button
              onClick={() => {
                setEditingPet(false);
                setSection('edit-pet');
                setSideBarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white transition-colors shadow-md shadow-emerald-200"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Cadastrar Pet</span>
            </button>
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-gray-100 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 ">
              <span className="text-emerald-700 text-sm font-semibold">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Usuário
              </p>
              <p className="text-xs text-gray-400 truncate">
                usuario@email.com
              </p>
            </div>
            {/* {currentUser.role === 'admin' && (
              <span className='text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-md flex-shrink-0'>
                Admin
              </span>
            )} */}
          </div>
          <button
            // onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </aside>

      <main className="">
        <header>
          <button onClick={() => setSideBarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
        </header>
      </main>
    </div>
  );
};
