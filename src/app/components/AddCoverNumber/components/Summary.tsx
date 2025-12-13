"use client";

import styles from "../addCoverNumbers.module.css";
import { coverNumberInfo } from "../AddCoverNumber";

interface SummaryProps {
  info: coverNumberInfo | null;
}
export default function Summary({ info }: SummaryProps) {
  return (
    <>
      <h1>Tak for din indsendelse</h1>
      <p>Dit covernumer er nu registreret med følgende oplysninger:</p>

      <div className={styles.infobox}>
        <div>
          <p className={styles.infoboxLabel}>Navn</p>
          <p>{info?.name}</p>
        </div>

        <div>
          <p className={styles.infoboxLabel}>E-mailadresse</p>
          <p>{info?.email}</p>
        </div>

        <div>
          <p className={styles.infoboxLabel}>Covernummer ISRC</p>
          <p>{info?.isrc}</p>
        </div>

        <div>
          <p className={styles.infoboxLabel}>Dit artistnavn</p>
          <p>{info?.artistName}</p>
        </div>

        {info?.linkToOriginalWork && (
          <div>
            <p className={styles.infoboxLabel}>Link til originalværket</p>
            <p>{info?.linkToOriginalWork}</p>
          </div>
        )}
      </div>

      <p>Du kan nu lukke dette vindue.</p>
    </>
  );
}
