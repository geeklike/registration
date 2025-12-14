"use client";

import { useState } from "react";
import styles from "../addCoverNumbers.module.css";
import { CoverNumberInformation, CoverNumberInfoProps, ERROR_MESSAGES, VALIDATION_MESSAGES } from "../types";
import { useForm, SubmitHandler } from "react-hook-form";
import { Search, Loader } from "lucide-react";
import StepNavigation from "./StepNavigation";

export default function OriginalWorkInfo({
  info,
  setInfo,
  currentStep,
  setCurrentStep,
}: CoverNumberInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CoverNumberInformation>({
    defaultValues: {
      linkToOriginalWork: info?.linkToOriginalWork ?? "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler: SubmitHandler<CoverNumberInformation> = async (data) => {
    setIsLoading(true);
    setError("");

    if (data.linkToOriginalWork && !info?.originalWork) {
      try {
        await fetchOriginalWorkData(data.linkToOriginalWork);
      } catch (err) {
        setError(ERROR_MESSAGES.FETCH_ORIGINAL_WORK_FAILED);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        await sendInfoToNMP(info);
        setCurrentStep(currentStep + 1);
      } catch (err) {
        setError(ERROR_MESSAGES.SEND_INFO_FAILED);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <h1>Oplysninger om originalværket</h1>

      {info?.originalWork && (
        <div className={styles.infobox}>
          <h2>Du har valgt værket "{info.originalWork.title}"</h2>

          <div>
            <p className={styles.infoboxLabel}>Titel</p>
            <p>{info?.originalWork.title}</p>
          </div>

          <div>
            <p className={styles.infoboxLabel}>Værknummer</p>
            <p>{info?.originalWork.isrc}</p>
          </div>

          <div>
            <p className={styles.infoboxLabel}>Komponister/Forfattere</p>
            {info?.originalWork.composersAndWriters.map(
              (composerOrWriter: string, index: number) => (
                <p key={index}>{composerOrWriter}</p>
              )
            )}
          </div>

          <div>
            <p className={styles.infoboxLabel}>Arrangør</p>
            {info?.originalWork.musicArrangers.map((musicArranger: string, index: number) => (
              <p key={index}>{musicArranger}</p>
            ))}
          </div>

          <div>
            <p className={styles.infoboxLabel}>Tekstforfatter</p>
            {info?.originalWork.lyricists.map((lyricist: string, index: number) => (
              <p key={index}>{lyricist}</p>
            ))}
          </div>

          <button
            className={styles.textButton}
            onClick={() => {
              updateOriginalWork({
                ...(info ?? {}),
                linkToOriginalWork: undefined,
                originalWork: undefined,
              });
              reset({ linkToOriginalWork: "" });
            }}
          >
            <Search className={styles.searchIcon} />
            Er det ikke det rigtige værk? Søg igen.
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        <div className={styles.inputGroup}>
          <label htmlFor="linkToOriginalWork">
            Indsæt et link til originalværket
            <span className={styles.optional}>Valgfri</span>
          </label>
          <input
            {...register("linkToOriginalWork", {
              minLength: {
                value: 5,
                message: VALIDATION_MESSAGES.LINK_MIN_LENGTH,
              },
            })}
            type="text"
            id="linkToOriginalWork"
            name="linkToOriginalWork"
            placeholder="ex. https://www.youtube.com/watch?v=UelDrZ1aFeY"
          />
          {errors?.linkToOriginalWork &&
            typeof errors.linkToOriginalWork.message === "string" && (
              <p className={styles.inputError}>
                {errors.linkToOriginalWork.message}
              </p>
            )}
        </div>

          <div className={styles.spacer}>
        {isLoading ? (
            <Loader className={styles.searchIcon} />
        ) : null}
          </div>

        {error && <p className={styles.inputError}>{error}</p>}

        <StepNavigation
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </form>
    </>
  );

  function updateOriginalWork(data: CoverNumberInformation) {
    setInfo(
      (prev) =>
        ({
          ...(prev ?? {}),
          linkToOriginalWork: data?.linkToOriginalWork,
          originalWork: data?.originalWork,
        } as CoverNumberInformation)
    );
  }
  async function fetchOriginalWorkData(link: string) {
    setIsLoading(true);

    // Simulate getting data based on the link
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate fetching data from an API based on the link
        const originalWorkData = {
          title: "Here Comes the Sun",
          isrc: "GBAYE0601696",
          composersAndWriters: ["John Lennon", "Paul McCartney"],
          musicArrangers: ["George Martin"],
          lyricists: ["John Lennon", "Paul McCartney"],
        };

        updateOriginalWork({
          ...(info ?? {}),
          linkToOriginalWork: link,
          originalWork: originalWorkData,
        } as CoverNumberInformation);

        setIsLoading(false);
        resolve({ success: true });
      }, 1000);
    });
  }
}
async function sendInfoToNMP(info: CoverNumberInformation | null) {
  // Simulate sending data to NMP
  return new Promise((resolve, reject) => {
    // Simulate sending data to an API
    setTimeout(() => {
      resolve({ success: true });
    }, 2000);
  });
}
