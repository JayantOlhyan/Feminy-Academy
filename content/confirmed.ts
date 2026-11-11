export interface ConfirmedClaims {
  accessDuration: boolean;
  gstIncluded: boolean;
  verifiedCertificate: boolean;
  softwareEngineer: boolean;
  salonChalaRahi: boolean;
  lessonDurations: boolean;
  feminyAcademyDomain: boolean;
}

/**
 * Claims confirmed directly by Sunita Rathee.
 * When set to false, scripts/check-placeholders.mjs enforces that corresponding
 * blocklisted phrases must not appear in any rendered production HTML.
 */
export const confirmedClaims: ConfirmedClaims = {
  accessDuration: false,
  gstIncluded: false,
  verifiedCertificate: false,
  softwareEngineer: false,
  salonChalaRahi: false,
  lessonDurations: false,
  feminyAcademyDomain: false,
};
