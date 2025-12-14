"use client";

import styles from "../addCoverNumbers.module.css";
import { CoverNumberInformation, CoverNumberInfoProps, VALIDATION_MESSAGES } from "../types";
import { useForm, SubmitHandler } from "react-hook-form";
import StepNavigation from "./StepNavigation";

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
  } = useForm<CoverNumberInformation>({
    defaultValues: {
      name: info?.name ?? "",
      email: info?.email ?? "",
    },
  });
 
  const submitHandler: SubmitHandler<CoverNumberInformation> = (data) => {
    setInfo(
      (prev: CoverNumberInformation | null) =>
        ({
          ...(prev ?? {}),
          name: data?.name,
          email: data?.email,
        } as CoverNumberInformation)
    );

    setCurrentStep(currentStep + 1);
  };

  return (
    <>
      <h1>Kontaktoplysninger</h1>
      <p>
        Vi bruger oplysningerne til at kontakte dig angående din registrering,
        hvis det bliver nødvendigt.
      </p>

      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Navn</label>
          <input
            {...register("name", {
              required: VALIDATION_MESSAGES.NAME_REQUIRED,
              validate: (value) => {
                const words = value.trim().split(/\s+/);
                return (
                  words.length >= 2 ||
                  VALIDATION_MESSAGES.NAME_FULL
                );
              },
            })}
            type="text"
            id="name"
            name="name"
            placeholder="Fornavn Efternavn"
          />
          {errors?.name && typeof errors.name.message === "string" && (
            <p className={styles.inputError}>{errors.name.message}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: VALIDATION_MESSAGES.EMAIL_REQUIRED,
              pattern: {
                value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                message: VALIDATION_MESSAGES.EMAIL_INVALID,
              },
            })}
            type="email"
            id="email"
            name="email"
            placeholder="mail@mail.dk"
            required
          />
          {errors?.email && typeof errors.email.message === "string" && (
            <p className={styles.inputError}>{errors.email.message}</p>
          )}
        </div>

        <StepNavigation
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </form>
    </>
  );
}
