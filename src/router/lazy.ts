import { lazy } from "react";

export const PageHome = lazy(() => import("@/pages/home"));
export const PageAffine = lazy(() => import("@/pages/affine"));
export const PageCaesarCipher = lazy(() => import("@/pages/caesarCipher"));
export const PageSubstitutionCipher = lazy(() => import("@/pages/substitutionCipher"));