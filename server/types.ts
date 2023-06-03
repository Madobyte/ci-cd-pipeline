export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}

export type PatientPublicInfo = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export type Discharge = {
	date: string;
	criteria: string;
};

export type SickLeave = {
	startDate: string;
	endDate: string;
};

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;

export type EntryWithoutId = UnionOmit<
	HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry,
	"id"
>;

export type BaseEntry = {
	id: string;
	date: string;
	specialist: string;
	description: string;
	diagnosisCodes?: Array<Diagnosis["code"]>;
};

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3,
}

export interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeave;
}

export interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Array<
		HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry
	>;
}
