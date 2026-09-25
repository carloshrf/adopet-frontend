import type { Pet } from './types/pet';
import type { User } from './types/user';

export const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@petcare.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

export const INITIAL_PETS: Pet[] = [
  {
    id: '1',
    ownerId: '1',
    name: 'Rex',
    species: 'Cachorro',
    breed: 'Labrador Retriever',
    birthDate: '2020-03-15',
    gender: 'male',
    weight: '28',
    color: 'Amarelo',
    microchip: '985112004567890',
    isNeutered: true,
    photos: [],
    vaccines: [
      {
        id: 'v1',
        name: 'Antirrábica',
        date: '2024-01-10',
        nextDueDate: '2025-01-10',
        veterinarian: 'Dr. Carlos Silva',
      },
      {
        id: 'v2',
        name: 'V10',
        date: '2024-01-10',
        nextDueDate: '2025-01-10',
        veterinarian: 'Dr. Carlos Silva',
      },
    ],
    diseases: [],
    medications: [],
    vetName: 'Dr. Carlos Silva',
    vetPhone: '(11) 99999-9999',
    vetEmail: 'carlos@clinicavet.com',
    notes:
      'Rex é muito dócil e adora brincar na água. Tem leve hipersensibilidade alimentar.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    ownerId: '1',
    name: 'Mimi',
    species: 'Gato',
    breed: 'Persa',
    birthDate: '2021-06-20',
    gender: 'female',
    weight: '4.5',
    color: 'Branco',
    microchip: '',
    isNeutered: true,
    photos: [],
    vaccines: [
      {
        id: 'v3',
        name: 'Antirrábica',
        date: '2024-03-05',
        nextDueDate: '2025-03-05',
        veterinarian: 'Dra. Ana Costa',
      },
      {
        id: 'v4',
        name: 'Tríplice Felina',
        date: '2024-03-05',
        nextDueDate: '2025-03-05',
        veterinarian: 'Dra. Ana Costa',
      },
    ],
    diseases: [
      {
        id: 'd1',
        name: 'Rinite Crônica',
        diagnosedAt: '2022-08-15',
        status: 'chronic',
        notes: 'Controle com medicação sazonal',
      },
    ],
    medications: ['Loratadina 0,5mg (sazonal)'],
    vetName: 'Dra. Ana Costa',
    vetPhone: '(11) 88888-8888',
    vetEmail: 'ana@clinicavet.com',
    notes:
      'Mimi é muito carinhosa mas sensível a poeira e mudanças de ambiente.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
