import { BLOCKED_BREEDS, MEET_GREET_BREEDS, LARGE_DOG_WEIGHT } from './constants';

export function normalizeBreed(breed: string): string {
  return breed.toLowerCase().trim();
}

export function isBlockedBreed(breed: string): boolean {
  const normalized = normalizeBreed(breed);
  return BLOCKED_BREEDS.some((blocked) => normalized.includes(blocked));
}

export function requiresMeetGreet(breed: string, weight: number): { required: boolean; reason?: string } {
  const normalized = normalizeBreed(breed);

  // Check specific breeds
  for (const meetGreetBreed of MEET_GREET_BREEDS) {
    if (normalized.includes(meetGreetBreed)) {
      return {
        required: true,
        reason: `${breed} requires a meet & greet before first stay`,
      };
    }
  }

  // Check weight
  if (weight >= LARGE_DOG_WEIGHT) {
    return {
      required: true,
      reason: `Dogs over ${LARGE_DOG_WEIGHT} lbs require a meet & greet before first stay`,
    };
  }

  return { required: false };
}

export function getBreedWarnings(breed: string, weight: number): {
  isBlocked: boolean;
  meetGreetRequired: boolean;
  message?: string;
} {
  if (isBlockedBreed(breed)) {
    return {
      isBlocked: true,
      meetGreetRequired: false,
      message: `We're sorry, but we are unable to board ${breed || 'this breed'} at this time.`,
    };
  }

  const meetGreet = requiresMeetGreet(breed, weight);
  if (meetGreet.required) {
    return {
      isBlocked: false,
      meetGreetRequired: true,
      message: meetGreet.reason,
    };
  }

  return { isBlocked: false, meetGreetRequired: false };
}
