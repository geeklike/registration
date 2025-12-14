"use client";

import styles from "../addCoverNumbers.module.css";
import { CoverNumberInformation, CoverNumberInfoProps, VALIDATION_MESSAGES } from "../types";
import { useForm, SubmitHandler } from "react-hook-form";
import StepNavigation from "./StepNavigation";

export default function CoverNumberInfo({
  info,
  setInfo,
  currentStep,
  setCurrentStep,
}: CoverNumberInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CoverNumberInformation>({
    defaultValues: {
      isrc: info?.isrc ?? "",
      artistName: info?.artistName ?? "",
    },
  });
 
  const submitHandler: SubmitHandler<CoverNumberInformation> = (data) => {
    setInfo((prev: CoverNumberInformation | null) => ({
      ...(prev ?? {}),
      isrc: data?.isrc,
      artistName: data?.artistName,
    } as CoverNumberInformation));

    setCurrentStep(currentStep + 1);
  };

  return (
    <>
      <h1>Oplysninger om dit covernummer</h1>

      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        <div className={styles.inputGroup}>
          <label htmlFor="isrc">ISRC</label>
          <input
            {...register("isrc", {
              required: VALIDATION_MESSAGES.ISRC_REQUIRED,
              pattern: {
                value: /[A-Z]{2}[A-Z0-9]{3}[0-9]{7}/,
                message: VALIDATION_MESSAGES.ISRC_INVALID,
              },
            })}
            type="text"
            id="isrc"
            name="isrc"
            placeholder="ex. 123456789000"
          />
          <p className={styles.inputHint}>
            ISRC står for International Standard Recordning Code. Det er en
            12-cifret kode, der identificerer hvert enkelt track på en
            udgivelse, som bestilles hos Gramex eller via din digitale
            distributør. <br /> Angiv uden tegn, streger og mellemrum.
          </p>
          {errors?.isrc && typeof errors.isrc.message === "string" && (
            <p className={styles.inputError}>{errors.isrc.message}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="artistName">Dit artistnavn</label>
          <input
            {...register("artistName", {
              required: VALIDATION_MESSAGES.ARTIST_NAME_REQUIRED,
              minLength: { value: 1, message: VALIDATION_MESSAGES.ARTIST_NAME_REQUIRED },
            })}
            type="artistName"
            id="artistName"
            name="artistName"
            placeholder="ex. The Beatles"
            required
          />
          {errors?.artistName &&
            typeof errors.artistName.message === "string" && (
              <p className={styles.inputError}>{errors.artistName.message}</p>
            )}
        </div>
        
        <StepNavigation currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </form>
    </>
  );
}
