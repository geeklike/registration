"use client";

import { useState } from "react";
import styles from "../addCoverNumbers.module.css";
import { CoverNumberInformation, CoverNumberInfoProps, ERROR_MESSAGES, VALIDATION_MESSAGES } from "../types";
import { fetchOriginalWorkData, sendInfoToNMP } from "../services/originalWorkService";
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
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submitHandler: SubmitHandler<CoverNumberInformation> = async (data) => {
    setError("");

    if (data.linkToOriginalWork && !info?.originalWork || data.linkToOriginalWork !== info?.linkToOriginalWork) {
      setIsFetching(true);
      try {
        const originalWork = data.linkToOriginalWork ? await fetchOriginalWorkData(data.linkToOriginalWork) : undefined;
        
        updateOriginalWork({
          ...(info ?? {}),
          linkToOriginalWork: data.linkToOriginalWork,
          originalWork,
        } as CoverNumberInformation);
      } catch (err) {
        setError(ERROR_MESSAGES.FETCH_ORIGINAL_WORK_FAILED);
      } finally {
        setIsFetching(false);
      }
    } else {
      setIsSubmitting(true);
      try {
        await sendInfoToNMP(info);
        setCurrentStep(currentStep + 1);
      } catch (err) {
        setError(ERROR_MESSAGES.SEND_INFO_FAILED);
      } finally {
        setIsSubmitting(false);
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
              (composerOrWriter: string) => (
                <p key={composerOrWriter}>{composerOrWriter}</p>
              )
            )}
          </div>

          <div>
            <p className={styles.infoboxLabel}>Arrangør</p>
            {info?.originalWork.musicArrangers.map((musicArranger: string) => (
              <p key={musicArranger}>{musicArranger}</p>
            ))}
          </div>

          <div>
            <p className={styles.infoboxLabel}>Tekstforfatter</p>
            {info?.originalWork.lyricists.map((lyricist: string) => (
              <p key={lyricist}>{lyricist}</p>
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
        {(isFetching || isSubmitting) && (
            <Loader className={styles.searchIcon} />
        )}
          </div>

        {error && <p className={styles.inputError}>{error}</p>}

        <StepNavigation
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </form>
    </>
  );

  function updateOriginalWork(data: CoverNumberInformation): void {
    setInfo(
      (prev) =>
        ({
          ...(prev ?? {}),
          linkToOriginalWork: data?.linkToOriginalWork,
          originalWork: data?.originalWork,
        } as CoverNumberInformation)
    );
  }
}
