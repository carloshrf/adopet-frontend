import { Plus, Search } from 'lucide-react';
import { SPECIES_EMOJI, type Pet } from '../../../types/pet';
import type { User } from '../../../types/user';
import { useState } from 'react';

interface PetListProps {
  pets: Pet[];
  users: User[];
  currentUser: User;
  onEdit: (pet: Pet) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

function getSpeciesEmoji(species: string) {
  return SPECIES_EMOJI[species] ?? '🐾';
}

export const PetList: React.FC<PetListProps> = ({
  pets,
  currentUser,
  onAdd,
  onDelete,
  onEdit,
  users,
}) => {
  const [search, setSearch] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('all');

  const allSpecies = [...new Set(pets.map((p) => p.species))];
  const stats = [
    {
      label: 'Total de Pets',
      value: pets.length,
      icon: '🐾',
      color: 'bg-emerald-50 border-emerald-100',
    },
    {
      label: 'Vacinados',
      value: pets.filter((p) => p.vaccines.length > 0).length,
      icon: '💉',
      color: 'bg-blue-50 border-blue-100',
    },
    {
      label: 'Castrados',
      value: pets.filter((p) => p.isNeutered).length,
      icon: '✂️',
      color: 'bg-purple-50 border-purple-100',
    },
    {
      label: 'Com Condições',
      value: pets.filter((p) => p.diseases.some((d) => d.status !== 'resolved'))
        .length,
      icon: '🩺',
      color: 'bg-orange-50 border-orange-100',
    },
  ];

  return (
    // stats
    <div className="p-6">
      {pets.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`${stat.color} border rounded-2xl p-4 flex items-center gap-3`}
            >
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-xl font-semibold text-gray-800 leading-none"></p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, raça ou espécie..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
        </div>
        {allSpecies.length > 1 && (
          <select
            value={filterSpecies}
            onChange={(e) => setFilterSpecies(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-600 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer text-sm"
          >
            <option value="all">Todas espécies</option>
            {allSpecies.map((s) => (
              <option key="s" value="s">
                {getSpeciesEmoji(s)} {s}
              </option>
            ))}
          </select>
        )}

        <button
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors whitespace-nowrap shadow-md shadow-emerald-200 text-sm"
          onClick={onAdd}
        >
          <Plus className="w-4 h-4" /> Novo Pet
        </button>
      </div>
    </div>
  );
};
