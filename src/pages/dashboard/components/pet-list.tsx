import { Edit2, Plus, Search } from 'lucide-react';
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

function calculateAge(birthDate: string): string | null {
  if (!birthDate) return null;
  try {
    const birth = new Date(birthDate);
    const now = new Date();
    const diffMs = now.getTime() - birth.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 30) return `${diffDays} dias`;
    const months = Math.floor(diffDays / 30);
    if (months < 12) return `${months} ${months === 1 ? 'mês' : 'meses'}`;
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    if (remMonths === 0) return `${years} ${years === 1 ? 'ano' : 'anos'}`;
    return `${years}a ${remMonths}m`;
  } catch {
    return null;
  }
}

function getStats(pets: Pet[]) {
  return [
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
  const [detailPet, setDetailPet] = useState<Pet | null>(null);
  const [filterSpecies, setFilterSpecies] = useState('all');

  const allSpecies = [...new Set(pets.map((p) => p.species))];

  const stats = getStats(pets);

  const filtered = pets.filter((pet) => {
    const q = search.toLowerCase();
    const matchesSearch =
      pet.name.toLowerCase().includes(q) ||
      pet.species.toLowerCase().includes(q);
    const matchesFilter =
      filterSpecies === 'all' || pet.species === filterSpecies;
    return matchesSearch && matchesFilter;
  });

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
                <p className="text-xl font-semibold text-gray-800 leading-none">
                  {stat.value}
                </p>
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
              <option key={s} value={s}>
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

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="text-gray-600 mb-1">
            {pets.length === 0
              ? 'Nenhum pet cadastrado ainda'
              : 'Nenhum pet encontrado'}
          </h3>
          <p className="text-sm text-gray-400 mb-5">
            {pets.length === 0
              ? 'Comece cadastrando seu primeiro pet'
              : 'Tente ajustar os filtros de busca'}
          </p>
          {pets.length === 0 && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors shadow-md shadow-emerald-200"
            >
              <Plus className="w-4 h-4" /> Cadastrar meu primeiro pet
            </button>
          )}
        </div>
      ) : (
        // pet-card
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((pet) => {
            const age = calculateAge(pet.birthDate);
            const activeConditions = pet.diseases.filter(
              (d) => d.status !== 'resolved',
            );
            return (
              <div
                key={pet.id}
                onClick={() => setDetailPet(pet)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group cursor-pointer"
              >
                <div className="relative h-44 overflow-hidden">
                  {pet.photos.length > 0 ? (
                    <img
                      src={pet.photos[0]}
                      alt={pet.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-content">
                      <span className="text-5xl">
                        {getSpeciesEmoji(pet.species)}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(pet);
                      }}
                      className="w-8 h-8 bg-white/95 hover:bg-white rounded-lg flex items-center justify-center shadow-md transition-colors"
                    >
                      <Edit2 className='w-3.5 h-3.5 text-gray-600' />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
