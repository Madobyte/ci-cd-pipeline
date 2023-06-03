import {
	Diagnosis,
	HealthCheckEntry,
	HospitalEntry,
	OccupationalHealthcareEntry,
} from "../../types";
import HealthCheckRatingCard from "./HealthCheckRating";
import HospitalEntryCard from "./HospitalEntry";
import OccupationalHealthcareCard from "./OccupationalHealthcare";

interface EntryProps {
	entry: HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
	diagnoses: Diagnosis[];
}

const Entry = ({ entry, diagnoses }: EntryProps) => {
	switch (entry.type) {
		case "Hospital":
			return <HospitalEntryCard entry={entry} diagnoses={diagnoses} />;
		case "OccupationalHealthcare":
			return <OccupationalHealthcareCard entry={entry} diagnoses={diagnoses} />;
		case "HealthCheck":
			return <HealthCheckRatingCard entry={entry} diagnoses={diagnoses} />;
		default:
			return <></>;
	}
};

export default Entry;
