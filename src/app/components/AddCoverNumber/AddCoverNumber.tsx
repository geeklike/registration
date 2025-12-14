"use client";

import styles from "./addCoverNumbers.module.css";
import { useState } from "react";
import { CoverNumberInformation, FORM_STEPS } from "./types";
import CoverNumberInfo from "./components/CoverNumberInfo";
import ContactInfo from "./components/ContactInfo";
import OriginalWorkInfo from "./components/OriginalWorkInfo";
import Summary from "./components/Summary";

export default function AddCoverNumber() {
  const [currentStep, setCurrentStep] = useState<number>(FORM_STEPS.CONTACT_INFO);
  const [info, setInfo] = useState<CoverNumberInformation | null>(null);

  return (
    <div className={styles.container}>
      {currentStep === FORM_STEPS.CONTACT_INFO ? (
        <ContactInfo
          info={info}
          setInfo={setInfo}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ) : currentStep === FORM_STEPS.COVER_NUMBER_INFO ? (
        <CoverNumberInfo
          info={info}
          setInfo={setInfo}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ) : currentStep === FORM_STEPS.ORIGINAL_WORK_INFO ? (
        <OriginalWorkInfo
          info={info}
          setInfo={setInfo}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ) : (
        currentStep === FORM_STEPS.SUMMARY && <Summary info={info} />
      )}
    </div>
  );
}
