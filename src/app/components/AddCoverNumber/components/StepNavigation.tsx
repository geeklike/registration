import styles from "../addCoverNumbers.module.css";

interface StepNavigationProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export default function StepNavigation({
  currentStep,
  setCurrentStep,
}: StepNavigationProps) {
  return (
    <div className={styles.setStep}>
      {currentStep > 0 && (
        <button
          className={styles.textButton}
          type="button"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Tilbage
        </button>
      )}

      <button className={styles.nextStep} type="submit">
        Næste
      </button>
    </div>
  );
}
