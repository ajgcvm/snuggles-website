export type UserRole = 'owner' | 'employee' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  avatar_url?: string;
  phone?: string;
  status: 'new' | 'approved' | 'blocked' | 'pending' | 'active';
  role?: UserRole;
  isPlatformAdmin?: boolean;
}

export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'other';
  breed?: string;
  weight?: number;
  age_years?: number;
  special_needs?: string;
  status: 'pending' | 'approved' | 'blocked';
  is_puppy?: boolean;
  needs_medication?: boolean;
  medication_notes?: string;
  gets_along_dogs?: 'yes' | 'sometimes' | 'no' | 'unknown';
  gets_along_cats?: 'yes' | 'sometimes' | 'no' | 'unknown';
  suggested_size?: 'mini' | 'small' | 'medium' | 'large' | 'super_large' | 'puppy';
}

export interface NewPet {
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'other';
  breed: string;
  weight: number;
  ageYears: number;
  isPuppy: boolean;
  needsMedication: boolean;
  medicationNotes: string;
  getsAlongDogs: 'yes' | 'sometimes' | 'no' | 'unknown';
  getsAlongCats: 'yes' | 'sometimes' | 'no' | 'unknown';
  specialNeeds: string;
}

export interface Booking {
  id: string;
  service: 'boarding' | 'daycare';
  check_in: string;
  check_out: string;
  status: 'pending' | 'pending_meetgreet' | 'confirmed' | 'completed' | 'cancelled';
  estimated_price: number;
  final_price?: number;
  pets: Pet[];
  client_name: string;
  client_email: string;
  client_phone: string;
  meet_greet_date?: string;
  created_at: string;
  source: string;
  internal_notes?: string;
  requires_meet_greet?: boolean;
  meet_greet_scheduled?: string;
  meet_greet_completed?: boolean;
}

export interface BookingState {
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
}

export interface AdminStats {
  pending: number;
  confirmed: number;
  completed: number;
  totalRevenue: number;
}

export interface AdminClient {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar_url?: string;
  status: 'new' | 'approved' | 'blocked';
  google_id?: string;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
  last_login?: string;
  pet_count?: number;
  booking_count?: number;
}

export interface AdminPet {
  id: string;
  user_id?: string;
  client_id?: string;  // Backward compatibility
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'other';
  breed?: string;
  weight?: number;
  age_years?: number;
  special_needs?: string;
  gets_along_dogs?: 'yes' | 'sometimes' | 'no' | 'unknown';
  gets_along_cats?: 'yes' | 'sometimes' | 'no' | 'unknown';
  suggested_size?: 'mini' | 'small' | 'medium' | 'large' | 'super_large' | 'puppy';
  status: 'pending' | 'approved' | 'blocked';
  internal_notes?: string;
  created_at: string;
  updated_at: string;
  // Joined from users
  client_name?: string;
  client_email?: string;
  client_status?: string;
}
