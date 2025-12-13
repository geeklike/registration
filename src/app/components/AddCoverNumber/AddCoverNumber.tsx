"use client";

import styles from "./addCoverNumbers.module.css";
import { useState } from "react";
import CoverNumberInfo from "./components/CoverNumberInfo";
import ContactInfo from "./components/ContactInfo";
import OriginalWorkInfo from "./components/OriginalWorkInfo";
import Summary from "./components/Summary";

export interface coverNumberInfo {
  name: string;
  email: string;
  isrc: string;
  artistName: string;
  linkToOriginalWork?: string;
  originalWork?: {
    title: string;
    isrc: string;
    composersAndWriters: string[];
    musicArrangers: string[];
    lyricists: string[];
  };
}

export interface CoverNumberInfoProps {
  info: coverNumberInfo | null;
  setInfo: React.Dispatch<React.SetStateAction<coverNumberInfo | null>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddCoverNumber() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [info, setInfo] = useState<coverNumberInfo | null>(null);

  return (
    <div className={styles.container}>
      {currentStep === 0 ? (
        <ContactInfo
          info={info}
          setInfo={setInfo}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ) : currentStep === 1 ? (
        <CoverNumberInfo
          info={info}
          setInfo={setInfo}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ) : currentStep === 2 ? (
        <OriginalWorkInfo
          info={info}
          setInfo={setInfo}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ) : (
        currentStep === 3 && <Summary info={info} />
      )}
    </div>
  );
}
