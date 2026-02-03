interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Mobile: Simple counter */}
      <div className="md:hidden text-center mb-4">
        <span className="text-sm text-stone-500">
          Step {currentStep} of {totalSteps}
        </span>
        <p className="font-medium text-stone-800">{steps[currentStep - 1]}</p>
      </div>

      {/* Desktop: Full stepper */}
      <div className="hidden md:flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    ${isCompleted ? 'bg-primary-600 text-white' : ''}
                    ${isCurrent ? 'bg-primary-100 text-primary-700 border-2 border-primary-600' : ''}
                    ${!isCompleted && !isCurrent ? 'bg-stone-100 text-stone-400' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium
                    ${isCurrent ? 'text-primary-700' : 'text-stone-500'}
                  `}
                >
                  {step}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded
                    ${isCompleted ? 'bg-primary-600' : 'bg-stone-200'}
                  `}
                  style={{ minWidth: '60px' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
