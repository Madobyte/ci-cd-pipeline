import {
	PatientPublicInfo,
	NewPatient,
	Patient,
	EntryWithoutId,
	HospitalEntry,
	OccupationalHealthcareEntry,
	HealthCheckEntry,
} from "../types";
import patients from "../data/patients";
import { v1 as uuid } from "uuid";

const getPatients = (): PatientPublicInfo[] => {
	return patients.map(
		({ id, name, dateOfBirth, gender, occupation, entries }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
			entries,
		})
	);
};

const getPatient = (id: string): PatientPublicInfo => {
	const patient = patients.find((p) => p.id === id);

	if (patient === undefined) throw new Error("Cannot find patient info");

	return {
		...patient,
	};
};

const addPatient = (newPatient: NewPatient): Patient => {
	const patient = { ...newPatient, id: uuid(), entries: [] };
	patients.push(patient);
	return patient;
};

const addEntry = (
	newEntry: EntryWithoutId,
	patientId: string
): HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry => {
	const entry = { ...newEntry, id: uuid() };
	const patient = patients.find((p) => p.id === patientId);

	if (patient === undefined) throw new Error("Cannot find patient");

	patient.entries.push(entry);
	return entry;
};

export default { getPatients, addPatient, getPatient, addEntry };
