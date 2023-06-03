import {
	Gender,
	NewPatient,
	EntryWithoutId,
	Diagnosis,
	Discharge,
	SickLeave,
	HealthCheckRating,
} from "./types";

import Diagnoses from "./data/diagnoses";

export const toNewPatientEntry = (object: unknown): NewPatient => {
	if (!object || typeof object !== "object")
		throw new Error("Incorrect or missing data");

	if (
		"name" in object &&
		"dateOfBirth" in object &&
		"ssn" in object &&
		"gender" in object &&
		"occupation" in object
	) {
		const newEntry: NewPatient = {
			name: parseName(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			ssn: parseSsn(object.name),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
			entries: [],
		};

		return newEntry;
	}

	throw new Error("Incorrect data: missing field");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
	if (!object || typeof object !== "object")
		throw new Error("Incorrect or missing data");

	if (
		"type" in object &&
		"date" in object &&
		"specialist" in object &&
		"description" in object
	) {
		let diagnosisCodes;

		if ("diagnosisCodes" in object) {
			diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
		} else {
			diagnosisCodes = undefined;
		}

		const baseProperties = {
			date: parseDate(object.date),
			specialist: parseSpecialist(object.specialist),
			description: parseDescription(object.description),
			diagnosisCodes,
		};

		const type = parseType(object.type);
		if (type === undefined) throw new Error("No type");

		if (type === "Hospital" && "discharge" in object) {
			const newEntry: EntryWithoutId = {
				...baseProperties,
				type: "Hospital",
				discharge: parseDischarge(object.discharge),
			};

			return newEntry;
		} else if (type === "OccupationalHealthcare" && "employerName" in object) {
			let sickLeave;

			if ("sickLeave" in object) {
				sickLeave = parseSickLeave(object.sickLeave);
			} else {
				sickLeave = undefined;
			}

			const newEntry: EntryWithoutId = {
				...baseProperties,
				type: "OccupationalHealthcare",
				employerName: parseEmployer(object.employerName),
				...(sickLeave !== undefined && sickLeave),
			};

			return newEntry;
		} else if (type === "HealthCheck" && "healthCheckRating" in object) {
			const newEntry: EntryWithoutId = {
				...baseProperties,
				type: "HealthCheck",
				healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
			};

			return newEntry;
		}
	}

	throw new Error("No entry made");
};

const parseType = (
	type: unknown
): "Hospital" | "HealthCheck" | "OccupationalHealthcare" => {
	if (!isString(type)) throw new Error("Incorrect type format " + type);
	switch (type) {
		case "Hospital":
		case "HealthCheck":
		case "OccupationalHealthcare":
			return type;
		default:
			throw new Error("Incorrect type format " + type);
	}
};

const parseSpecialist = (specialist: unknown): string => {
	if (!isString(specialist))
		throw new Error("Incorrect specialist format " + specialist);
	return specialist;
};

const parseDescription = (description: unknown): string => {
	if (!isString(description))
		throw new Error("Incorrect description format " + description);
	return description;
};

const parseDiagnosisCodes = (
	diagnosisCodes: unknown
): Array<Diagnosis["code"]> => {
	if (!isArray(diagnosisCodes) || !isDiagnosis(diagnosisCodes))
		throw new Error("Diagnosis codes is not an array");
	return diagnosisCodes;
};

const parseDischarge = (discharge: unknown): Discharge => {
	if (!isDischarge(discharge))
		throw new Error("Incorrect discharge format: " + discharge);
	return discharge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
	if (!isSickLeave(sickLeave))
		throw new Error("Incorrect sick leave format: " + sickLeave);

	return sickLeave;
};

const parseEmployer = (employer: unknown): string => {
	if (!isString(employer))
		throw new Error("Incorrect employer format: " + employer);

	return employer;
};

const parseName = (name: unknown): string => {
	if (!isString(name)) throw new Error("Incorrect name format: " + name);

	return name;
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !isDate(date))
		throw new Error("Incorrect date: " + date);
	return date;
};

const parseSsn = (ssn: unknown): string => {
	if (!isString(ssn)) throw new Error("Incorrect SSN: " + ssn);
	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender))
		throw new Error("Incorrect gender: " + gender);
	return gender;
};

const parseHealthCheckRating = (
	healthCheckRating: unknown
): HealthCheckRating => {
	if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating))
		throw new Error(
			"Incorrect health check rating format: " + healthCheckRating
		);
	return healthCheckRating;
};
const parseOccupation = (occupation: unknown): string => {
	if (!isString(occupation))
		throw new Error("Incorrect occupation: " + occupation);
	return occupation;
};

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): date is string => {
	return Boolean(Date.parse(date));
};

const isArray = (array: unknown): array is string[] => {
	return Array.isArray(array) && array.every((code) => isString(code));
};

const isNumber = (number: unknown): number is number => {
	return !isNaN(Number(number));
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
	return (
		typeof discharge === "object" &&
		"date" in (discharge as Discharge) &&
		"criteria" in (discharge as Discharge) &&
		typeof (discharge as Discharge)["date"] === "string" &&
		typeof (discharge as Discharge)["criteria"] === "string"
	);
};

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
	return (
		typeof sickLeave === "object" &&
		"startDate" in (sickLeave as SickLeave) &&
		"endDate" in (sickLeave as SickLeave) &&
		typeof (sickLeave as SickLeave)["startDate"] === "string" &&
		typeof (sickLeave as SickLeave)["endDate"] === "string"
	);
};

const isGender = (gender: string): gender is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(gender);
};

const isHealthCheckRating = (
	healthCheckRating: number
): healthCheckRating is HealthCheckRating => {
	return Object.values(HealthCheckRating)
		.map((v) => Number(v))
		.includes(healthCheckRating);
};

const isDiagnosis = (array: string[]): array is Array<Diagnosis["code"]> => {
	return array.every(
		(code) => Diagnoses.find((d) => d.code === code) !== undefined
	);
};
