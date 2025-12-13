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
      name: info?.name ?? "",
      email: info?.email ?? "",
    },
  });

  const submitHandler: SubmitHandler<coverNumberInfo> = (data) => {
    setInfo((prev) => ({
      ...(prev ?? {}),
      name: data?.name,
      email: data?.email,
    } as coverNumberInfo));

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
              required: "Navn er obligatorisk",
              validate: (value) => {
                const words = value.trim().split(/\s+/);
                return (
                  words.length >= 2 ||
                  "Indtast venligst både fornavn og efternavn"
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
              required: "Email er obligatorisk",
              pattern: {
                value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                message: "Indtast venligst en gyldig email-adresse",
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
        <div className={styles.setStep}>
          <button className={styles.nextStep} type="submit">
            Næste
          </button>
        </div>
      </form>
    </>
  );
}
