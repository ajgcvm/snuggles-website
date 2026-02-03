export const API_URL = 'https://denboard-booking-api.felhen.workers.dev';

// Blocked breeds (cannot be boarded)
export const BLOCKED_BREEDS = [
  'rottweiler', 'rottie', 'mastiff', 'english mastiff', 'bull mastiff',
  'neapolitan mastiff', 'tibetan mastiff', 'cane corso', 'presa canario',
  'dogo argentino', 'fila brasileiro', 'tosa inu', 'wolf hybrid', 'wolfdog'
];

// Breeds requiring meet & greet
export const MEET_GREET_BREEDS = [
  'pit bull', 'pitbull', 'pit mix', 'american pit bull terrier',
  'doberman', 'doberman pinscher', 'german shepherd', 'akita', 'chow chow'
];

// Large dog weight threshold for meet & greet
export const LARGE_DOG_WEIGHT = 41;

export const SITE_CONFIG = {
  name: 'Snuggles Pet Boarding',
  description: 'Family-owned pet boarding in Melbourne, FL. Where dogs, cats, and birds roam free on our farm. Daily photo updates included.',
  phone: '(954) 907-7750',
  address: '4253 Pinewood Rd, Melbourne, FL',
  roverUrl: 'https://www.rover.com/members/anna-c-pet-boarding-and-daycare/',
  calendlyUrl: 'https://calendly.com/snugglespetboarding',
};
