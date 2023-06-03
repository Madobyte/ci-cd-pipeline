import { Diagnosis } from "../types";
import diagnoses from "../data/diagnoses";

const getDiagnoses = (): Diagnosis[] => diagnoses;

export default { getDiagnoses };
