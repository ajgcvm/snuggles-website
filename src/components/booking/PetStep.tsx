'use client';

import { useState } from 'react';
import { useBookingStore, createEmptyPet } from '@/stores/bookingStore';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { getBreedWarnings } from '@/lib/breedValidation';
import type { NewPet } from '@/types';

export function PetStep() {
  const {
    pets,
    addPet,
    updatePet,
    removePet,
    registeredPets,
    selectedRegisteredPets,
    toggleRegisteredPet,
    setStep,
  } = useBookingStore();

  const [showNewPetForm, setShowNewPetForm] = useState(false);
  const [editingPetIndex, setEditingPetIndex] = useState<number | null>(null);
  const [breedWarning, setBreedWarning] = useState<{
    isBlocked: boolean;
    meetGreetRequired: boolean;
    message?: string;
  } | null>(null);

  const hasAtLeastOnePet = pets.length > 0 || selectedRegisteredPets.length > 0;
  const hasBlockedPet = pets.some((pet) => {
    const warning = getBreedWarnings(pet.breed, pet.weight);
    return warning.isBlocked;
  });

  const handleContinue = () => {
    if (hasAtLeastOnePet && !hasBlockedPet) {
      setStep(4);
    }
  };

  const handleBack = () => {
    setStep(2);
  };

  const handleAddPet = (pet: NewPet) => {
    const warning = getBreedWarnings(pet.breed, pet.weight);
    if (!warning.isBlocked) {
      addPet(pet);
      setShowNewPetForm(false);
      setBreedWarning(null);
    }
  };

  const handleUpdatePet = (index: number, pet: NewPet) => {
    const warning = getBreedWarnings(pet.breed, pet.weight);
    if (!warning.isBlocked) {
      updatePet(index, pet);
      setEditingPetIndex(null);
      setBreedWarning(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-stone-800 mb-2 text-center">
        Who&apos;s staying with us?
      </h2>
      <p className="text-stone-600 text-center mb-8">
        Add the pets that will be joining us
      </p>

      {/* Registered Pets */}
      {registeredPets.length > 0 && (
        <div className="mb-8">
          <h3 className="font-medium text-stone-700 mb-3">Your Registered Pets</h3>
          <div className="space-y-2">
            {registeredPets.map((pet) => {
              const isSelected = selectedRegisteredPets.includes(pet.id);
              return (
                <button
                  key={pet.id}
                  onClick={() => toggleRegisteredPet(pet.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-stone-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-primary-100' : 'bg-stone-100'
                    }`}>
                      <span className={`font-bold ${isSelected ? 'text-primary-600' : 'text-stone-500'}`}>
                        {pet.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-stone-800">{pet.name}</span>
                      <p className="text-sm text-stone-500">
                        {pet.breed || pet.type}
                        {pet.weight && `, ${pet.weight} lbs`}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* New Pets List */}
      {pets.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-stone-700 mb-3">New Pets for This Booking</h3>
          <div className="space-y-2">
            {pets.map((pet, index) => {
              const warning = getBreedWarnings(pet.breed, pet.weight);

              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 ${
                    warning.isBlocked
                      ? 'border-red-300 bg-red-50'
                      : warning.meetGreetRequired
                      ? 'border-amber-300 bg-amber-50'
                      : 'border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-stone-800">{pet.name || 'Unnamed Pet'}</span>
                      <p className="text-sm text-stone-500">
                        {pet.type}
                        {pet.breed && ` - ${pet.breed}`}
                        {pet.weight > 0 && `, ${pet.weight} lbs`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {warning.isBlocked && <Badge variant="danger">Restricted</Badge>}
                      {warning.meetGreetRequired && <Badge variant="warning">Meet & Greet</Badge>}
                      <button
                        onClick={() => setEditingPetIndex(index)}
                        className="text-stone-400 hover:text-stone-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removePet(index)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {warning.message && (
                    <p className={`text-sm mt-2 ${warning.isBlocked ? 'text-red-600' : 'text-amber-600'}`}>
                      {warning.message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Pet Button / Form */}
      {!showNewPetForm && editingPetIndex === null && (
        <button
          onClick={() => setShowNewPetForm(true)}
          className="w-full p-4 rounded-xl border-2 border-dashed border-stone-300 hover:border-primary-400 text-stone-600 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add a New Pet
        </button>
      )}

      {/* New Pet Form */}
      {showNewPetForm && (
        <PetForm
          onSubmit={handleAddPet}
          onCancel={() => {
            setShowNewPetForm(false);
            setBreedWarning(null);
          }}
          breedWarning={breedWarning}
          setBreedWarning={setBreedWarning}
        />
      )}

      {/* Edit Pet Form */}
      {editingPetIndex !== null && (
        <PetForm
          initialData={pets[editingPetIndex]}
          onSubmit={(pet) => handleUpdatePet(editingPetIndex, pet)}
          onCancel={() => {
            setEditingPetIndex(null);
            setBreedWarning(null);
          }}
          breedWarning={breedWarning}
          setBreedWarning={setBreedWarning}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleBack}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back
        </Button>

        <Button onClick={handleContinue} disabled={!hasAtLeastOnePet || hasBlockedPet}>
          Continue
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

interface PetFormProps {
  initialData?: NewPet;
  onSubmit: (pet: NewPet) => void;
  onCancel: () => void;
  breedWarning: { isBlocked: boolean; meetGreetRequired: boolean; message?: string } | null;
  setBreedWarning: (warning: { isBlocked: boolean; meetGreetRequired: boolean; message?: string } | null) => void;
}

function PetForm({ initialData, onSubmit, onCancel, breedWarning, setBreedWarning }: PetFormProps) {
  const [pet, setPet] = useState<NewPet>(initialData || createEmptyPet());

  const handleChange = (field: keyof NewPet, value: string | number | boolean) => {
    const updatedPet = { ...pet, [field]: value };
    setPet(updatedPet);

    // Check breed warnings when breed or weight changes
    if (field === 'breed' || field === 'weight') {
      const warning = getBreedWarnings(
        field === 'breed' ? String(value) : pet.breed,
        field === 'weight' ? Number(value) : pet.weight
      );
      setBreedWarning(warning.isBlocked || warning.meetGreetRequired ? warning : null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const warning = getBreedWarnings(pet.breed, pet.weight);
    if (warning.isBlocked) {
      setBreedWarning(warning);
      return;
    }
    onSubmit(pet);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-stone-50 rounded-xl p-6 mt-4">
      <h3 className="font-bold text-stone-800 mb-4">
        {initialData ? 'Edit Pet' : 'Add New Pet'}
      </h3>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Pet Name *"
            value={pet.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            placeholder="Buddy"
          />
          <Select
            label="Type *"
            value={pet.type}
            onChange={(e) => handleChange('type', e.target.value)}
            required
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="other">Other</option>
          </Select>
        </div>

        {pet.type === 'dog' && (
          <>
            <Input
              label="Breed"
              value={pet.breed}
              onChange={(e) => handleChange('breed', e.target.value)}
              placeholder="Golden Retriever"
            />

            {breedWarning && (
              <div className={`p-3 rounded-lg ${breedWarning.isBlocked ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                <p className="text-sm">{breedWarning.message}</p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Weight (lbs)"
                type="number"
                value={pet.weight || ''}
                onChange={(e) => handleChange('weight', parseFloat(e.target.value) || 0)}
                placeholder="50"
              />
              <Input
                label="Age (years)"
                type="number"
                step="0.5"
                value={pet.ageYears || ''}
                onChange={(e) => handleChange('ageYears', parseFloat(e.target.value) || 0)}
                placeholder="3"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 cursor-pointer hover:bg-stone-100">
                <input
                  type="checkbox"
                  checked={pet.isPuppy}
                  onChange={(e) => handleChange('isPuppy', e.target.checked)}
                  className="w-4 h-4 text-primary-600"
                />
                <span className="text-stone-700">Under 1 year old (puppy)</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 cursor-pointer hover:bg-stone-100">
                <input
                  type="checkbox"
                  checked={pet.needsMedication}
                  onChange={(e) => handleChange('needsMedication', e.target.checked)}
                  className="w-4 h-4 text-primary-600"
                />
                <span className="text-stone-700">Needs medication</span>
              </label>
            </div>

            {pet.needsMedication && (
              <Textarea
                label="Medication Details"
                value={pet.medicationNotes}
                onChange={(e) => handleChange('medicationNotes', e.target.value)}
                placeholder="Describe the medication, dosage, and schedule"
                rows={2}
              />
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <Select
                label="Gets along with dogs?"
                value={pet.getsAlongDogs}
                onChange={(e) => handleChange('getsAlongDogs', e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="sometimes">Sometimes</option>
                <option value="no">No</option>
                <option value="unknown">Unknown</option>
              </Select>

              <Select
                label="Gets along with cats?"
                value={pet.getsAlongCats}
                onChange={(e) => handleChange('getsAlongCats', e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="sometimes">Sometimes</option>
                <option value="no">No</option>
                <option value="unknown">Unknown</option>
              </Select>
            </div>
          </>
        )}

        <Textarea
          label="Special Needs or Notes"
          value={pet.specialNeeds}
          onChange={(e) => handleChange('specialNeeds', e.target.value)}
          placeholder="Any allergies, dietary needs, behavioral notes, etc."
          rows={2}
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!pet.name || breedWarning?.isBlocked}>
          {initialData ? 'Save Changes' : 'Add Pet'}
        </Button>
      </div>
    </form>
  );
}
