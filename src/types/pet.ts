export interface Vaccine {
  id: string;
  name: string;
  date: string;
  nextDueDate?: string;
  veterinarian: string;
  notes?: string;
}

export interface Disease {
  id: string;
  name: string;
  diagnosedAt: string;
  status: 'active' | 'resolved' | 'chronic';
  notes?: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: string;
  breed?: string;
  birthDate: string;
  gender: 'male' | 'female';
  weight: string;
  color: string;
  microchip?: string;
  isNeutered: boolean;
  photos: string[];
  vaccines: Vaccine[];
  diseases: Disease[];
  medications: string[];
  vetName?: string;
  vetPhone?: string;
  vetEmail?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const SPECIES_EMOJI: Record<string, string> = {
  Cachorro: '🐕',
  Gato: '🐈',
  Pássaro: '🐦',
  Coelho: '🐇',
  Peixe: '🐠',
  Hamster: '🐹',
  Tartaruga: '🐢',
  Outro: '🐾',
};