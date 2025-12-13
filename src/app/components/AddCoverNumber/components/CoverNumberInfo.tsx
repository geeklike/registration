"use client";

import styles from "../addCoverNumbers.module.css";
import { coverNumberInfo, CoverNumberInfoProps } from "../AddCoverNumber";
import { useForm, SubmitHandler } from "react-hook-form";

export default function ContactInfo({
  info,
  setInfo,
  currentStep,
  setCurrentStep,
}: CoverNumberInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<coverNumberInfo>({
    defaultValues: {
      isrc: info?.isrc ?? "",
      artistName: info?.artistName ?? "",
    },});

  const submitHandler: SubmitHandler<coverNumberInfo> = (data) => {
    setInfo((prev) => ({
      ...(prev ?? {}),
      isrc: data?.isrc,
      artistName: data?.artistName,
    } as coverNumberInfo));

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
              required: "ISRC er obligatorisk",
              pattern: {
                value: /[A-Z]{2}[A-Z0-9]{3}[0-9]{7}/,
                message: "Indtast venligst en gyldig ISRC kode",
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
              required: "Artistnavn er obligatorisk",
              minLength: { value: 1, message: "Artistnavn skal udfyldes" },
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
        <div className={styles.setStep}>
          <button
            className={styles.textButton}
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Tilbage
          </button>

          <button className={styles.nextStep} type="submit">
            Næste
          </button>
        </div>
      </form>
    </>
  );
}
