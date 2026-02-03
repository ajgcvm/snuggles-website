import { create } from 'zustand';
import type { NewPet, User, Pet } from '@/types';

interface BookingState {
  currentStep: number;
  service: 'boarding' | 'daycare' | '';
  checkIn: string;
  checkOut: string;
  pets: NewPet[];
  selectedRegisteredPets: string[];
  client: {
    name: string;
    email: string;
    phone: string;
  };
  estimate: { total: number } | null;

  // User data
  authToken: string | null;
  loggedInUser: User | null;
  registeredPets: Pet[];
}

interface BookingActions {
  setStep: (step: number) => void;
  setService: (service: 'boarding' | 'daycare') => void;
  setDates: (checkIn: string, checkOut: string) => void;
  addPet: (pet: NewPet) => void;
  updatePet: (index: number, pet: NewPet) => void;
  removePet: (index: number) => void;
  toggleRegisteredPet: (petId: string) => void;
  setClient: (client: { name: string; email: string; phone: string }) => void;
  setEstimate: (estimate: { total: number } | null) => void;
  setAuth: (token: string | null, user: User | null, pets: Pet[]) => void;
  reset: () => void;
}

const initialState: BookingState = {
  currentStep: 1,
  service: '',
  checkIn: '',
  checkOut: '',
  pets: [],
  selectedRegisteredPets: [],
  client: { name: '', email: '', phone: '' },
  estimate: null,
  authToken: null,
  loggedInUser: null,
  registeredPets: [],
};

export const useBookingStore = create<BookingState & BookingActions>((set) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  setService: (service) => set({ service }),

  setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),

  addPet: (pet) =>
    set((state) => ({
      pets: [...state.pets, pet],
    })),

  updatePet: (index, pet) =>
    set((state) => ({
      pets: state.pets.map((p, i) => (i === index ? pet : p)),
    })),

  removePet: (index) =>
    set((state) => ({
      pets: state.pets.filter((_, i) => i !== index),
    })),

  toggleRegisteredPet: (petId) =>
    set((state) => ({
      selectedRegisteredPets: state.selectedRegisteredPets.includes(petId)
        ? state.selectedRegisteredPets.filter((id) => id !== petId)
        : [...state.selectedRegisteredPets, petId],
    })),

  setClient: (client) => set({ client }),

  setEstimate: (estimate) => set({ estimate }),

  setAuth: (token, user, pets) =>
    set({
      authToken: token,
      loggedInUser: user,
      registeredPets: pets,
      client: user
        ? {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
          }
        : initialState.client,
    }),

  reset: () => set(initialState),
}));

export function createEmptyPet(): NewPet {
  return {
    name: '',
    type: 'dog',
    breed: '',
    weight: 0,
    ageYears: 0,
    isPuppy: false,
    needsMedication: false,
    medicationNotes: '',
    getsAlongDogs: 'yes',
    getsAlongCats: 'unknown',
    specialNeeds: '',
  };
}
