import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { Female, Male } from "@mui/icons-material";
import Entry from "../Entry";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from "@mui/material";
import AddEntryModal from "./AddEntryModal";

const PatientPage = () => {
	const [patient, setPatient] = useState<Patient>();
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
	const [visible, setVisible] = useState(false);
	const id = useParams().id;

	useEffect(() => {
		if (id === undefined) throw new Error("ID is undefined");
		patientService
			.getPatient(id)
			.then((patient) => setPatient(patient))
			.catch((error) => console.error(error));
		diagnosisService
			.getAllDiagnoses()
			.then((diagnoses) => setDiagnoses(diagnoses))
			.catch((error) => console.error(error));
	}, []);

	if (patient === undefined || diagnoses === undefined) return null;

	const handleNewEntryClick = () => {
		setVisible(true);
	};

	const close = () => {
		setVisible(false);
	};

	return (
		<div>
			<Card style={{ maxWidth: "400px", margin: "0 auto" }}>
				<CardContent>
					<Typography variant="h4">{patient.name}</Typography>
					{patient.gender === "male" ? <Male /> : <Female />}

					<Typography variant="body2">SSN: {patient.ssn}</Typography>
					<Typography variant="body2" gutterBottom>
						Occupation: {patient.occupation}
					</Typography>
					<Divider />
					<Typography variant="body1" gutterBottom component="div">
						Entries
						<CardActions>
							<Button onClick={handleNewEntryClick}>Add entry</Button>
						</CardActions>
					</Typography>
					{patient.entries.map((entry) => (
						<div key={entry.id}>
							<Entry entry={entry} diagnoses={diagnoses} />
						</div>
					))}
				</CardContent>
				<AddEntryModal
					visible={visible}
					close={close}
					patient={patient}
					setPatient={setPatient}
				/>
			</Card>
		</div>
	);
};

export default PatientPage;
