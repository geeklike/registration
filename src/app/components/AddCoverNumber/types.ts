export interface OriginalWork {
  title: string;
  isrc: string;
  composersAndWriters: string[];
  musicArrangers: string[];
  lyricists: string[];
}

export interface CoverNumberInformation {
  name: string;
  email: string;
  isrc: string;
  artistName: string;
  linkToOriginalWork?: string;
  originalWork?: OriginalWork;
}

export interface CoverNumberInfoProps {
  info: CoverNumberInformation | null;
  setInfo: React.Dispatch<React.SetStateAction<CoverNumberInformation | null>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const FORM_STEPS = {
  CONTACT_INFO: 0,
  COVER_NUMBER_INFO: 1,
  ORIGINAL_WORK_INFO: 2,
  SUMMARY: 3,
} as const;

export const ERROR_MESSAGES = {
  FETCH_ORIGINAL_WORK_FAILED:
    "Der opstod en fejl ved hentning af oplysninger om originalværket. Prøv igen.",
  SEND_INFO_FAILED: "Der opstod en fejl ved afsendelse af oplysningerne. Prøv igen.",
} as const;

export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: "Navn er obligatorisk",
  NAME_FULL: "Indtast venligst både fornavn og efternavn",
  EMAIL_REQUIRED: "Email er obligatorisk",
  EMAIL_INVALID: "Indtast venligst en gyldig email-adresse",
  ISRC_REQUIRED: "ISRC er obligatorisk",
  ISRC_INVALID: "Indtast venligst en gyldig ISRC kode",
  ARTIST_NAME_REQUIRED: "Artistnavn er obligatorisk",
  LINK_MIN_LENGTH: "Linket skal være mindst 5 tegn langt",
} as const;
