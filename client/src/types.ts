import { CloseReason } from "@mui/material";

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}

export interface EntryFormProps {
	patient: Patient;
	setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
	close: (reason: CloseReason) => void;
}

type Discharge = {
	date: string;
	criteria: string;
};

type SickLeave = {
	startDate: string;
	endDate: string;
};

type BaseEntry = {
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
	sickLeave: SickLeave;
}

export interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;

export type EntryWithoutId = UnionOmit<
	HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry,
	"id"
>;

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries: Array<
		HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry
	>;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
