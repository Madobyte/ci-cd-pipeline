import {
	FormControl,
	InputLabel,
	Input,
	TextField,
	Select,
	OutlinedInput,
	Box,
	Chip,
	MenuItem,
	SelectChangeEvent,
	Button,
	FormGroup,
	FormLabel,
} from "@mui/material";
import { Diagnosis, EntryFormProps, EntryWithoutId } from "../../../types";
import { useState, useEffect } from "react";
import diagnosisService from "../../../services/diagnosis";
import patientService from "../../../services/patients";
import { useParams } from "react-router-dom";

const OccupationalHealthcareEntryForm = ({
	patient,
	setPatient,
	close,
}: EntryFormProps) => {
	const id = useParams().id;
	const [codes, setCodes] = useState<Diagnosis[]>();

	const [entryDate, setEntryDate] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [specialist, setSpecialist] = useState("");
	const [description, setDescription] = useState("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [employer, setEmployer] = useState("");
	const [startDate, setStartDate] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

	useEffect(() => {
		diagnosisService
			.getAllDiagnoses()
			.then((codes) => setCodes(codes))
			.catch((error) => console.error(error));
	}, []);

	const handleEntryCodesChange = (
		e: SelectChangeEvent<typeof diagnosisCodes>
	) => {
		const {
			target: { value },
		} = e;

		if (Array.isArray(value)) {
			const values = value.map((x) => x);
			setDiagnosisCodes([...values]);
		}
	};

	const handleEntryDateChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const {
			target: { value },
		} = e;

		setEntryDate(value);
	};

	const handleStartDateChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const {
			target: { value },
		} = e;

		setStartDate(value);
	};

	const handleEndDateChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const {
			target: { value },
		} = e;

		setEndDate(value);
	};

	const handleSpecialistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = e;
		setSpecialist(value);
	};

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = e;
		setDescription(value);
	};

	const handleEmployerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = e;
		setEmployer(value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newOccupationalHealthcareEntry: EntryWithoutId = {
			type: "OccupationalHealthcare",
			date: entryDate,
			specialist,
			description,
			diagnosisCodes,
			employerName: employer,
			sickLeave: {
				startDate,
				endDate,
			},
		};

		if (id === undefined) throw new Error("No id");

		const newEntry = await patientService.addEntry(
			id,
			newOccupationalHealthcareEntry
		);

		setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
		close("toggle");
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormControl fullWidth margin="dense" required>
				<InputLabel>Date</InputLabel>
				<Input
					type="date"
					fullWidth
					value={entryDate}
					onChange={handleEntryDateChange}
				/>
			</FormControl>
			<TextField
				label="Specialist"
				fullWidth
				margin="dense"
				value={specialist}
				onChange={handleSpecialistChange}
				required
			/>
			<TextField
				value={description}
				onChange={handleDescriptionChange}
				label="Description"
				fullWidth
				margin="dense"
				multiline
				rows={3}
				required
			/>
			<FormControl fullWidth margin="dense">
				<InputLabel>Diagnosis codes</InputLabel>
				<Select
					value={diagnosisCodes}
					onChange={handleEntryCodesChange}
					multiple
					input={
						<OutlinedInput id="select-multiple-chip" label="Diagnosis codes" />
					}
					renderValue={(selected: string[]) => {
						return (
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
								{selected.map((value: unknown) => (
									<Chip key={value as string} label={value as string} />
								))}
							</Box>
						);
					}}
				>
					{codes?.map((c) => (
						<MenuItem key={c.code} value={c.code}>
							{c.code} - {c.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				label="Employer"
				fullWidth
				margin="dense"
				value={employer}
				onChange={handleEmployerChange}
				required
			/>
			<FormGroup
				style={{
					border: "1px solid rgba(0, 0, 0, 0.4)",
					borderRadius: "5px",
					padding: "20px",
					marginTop: "10px",
				}}
			>
				<FormLabel>Sick leave</FormLabel>
				<FormControl fullWidth margin="dense" required>
					<InputLabel>Start date</InputLabel>
					<Input
						type="date"
						fullWidth
						value={startDate}
						onChange={handleStartDateChange}
					/>
				</FormControl>
				<FormControl fullWidth margin="dense" required>
					<InputLabel>End date</InputLabel>
					<Input
						type="date"
						fullWidth
						value={endDate}
						onChange={handleEndDateChange}
					/>
				</FormControl>
			</FormGroup>
			<FormControl margin="dense">
				<Button type="submit" variant="contained">
					Submit
				</Button>
			</FormControl>
		</form>
	);
};

export default OccupationalHealthcareEntryForm;
