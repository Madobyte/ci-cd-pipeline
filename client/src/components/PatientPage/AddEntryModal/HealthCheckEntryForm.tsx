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
	FormLabel,
	FormControlLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import {
	Diagnosis,
	EntryFormProps,
	EntryWithoutId,
	HealthCheckRating,
} from "../../../types";
import { useState, useEffect } from "react";
import diagnosisService from "../../../services/diagnosis";
import patientService from "../../../services/patients";
import { useParams } from "react-router-dom";

const HealthCheckEntryForm = ({
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

	const [healthCheckRating, setHealthCheckRating] =
		useState<HealthCheckRating>(0);

	useEffect(() => {
		diagnosisService
			.getAllDiagnoses()
			.then((code) => setCodes(code))
			.catch((error) => console.log(error));
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

	const handleHealthCheckRatingChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const {
			target: { value },
		} = e;
		setHealthCheckRating(Number(value));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newHealthCheckEntry: EntryWithoutId = {
			type: "HealthCheck",
			date: entryDate,
			specialist,
			description,
			diagnosisCodes,
			healthCheckRating,
		};

		if (id === undefined) throw new Error("No id");

		const newEntry = await patientService.addEntry(id, newHealthCheckEntry);
		setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
		close("toggle");
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormControl fullWidth margin="dense">
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
			<FormControl
				margin="dense"
				style={{
					border: "1px solid rgba(0, 0, 0, 0.4)",
					borderRadius: "5px",
					padding: "20px",
					marginTop: "10px",
					display: "block",
				}}
				required
			>
				<FormLabel>Health Check Rating</FormLabel>
				<RadioGroup
					value={healthCheckRating}
					onChange={handleHealthCheckRatingChange}
				>
					{Object.keys(HealthCheckRating).map(
						(x) =>
							typeof x === "string" &&
							!isNaN(Number(x)) && (
								<FormControlLabel
									key={x}
									value={Number(x)}
									control={<Radio />}
									label={HealthCheckRating[Number(x)]}
								/>
							)
					)}
				</RadioGroup>
			</FormControl>
			<FormControl margin="dense" component="div">
				<Button type="submit" variant="contained">
					Submit
				</Button>
			</FormControl>
		</form>
	);
};

export default HealthCheckEntryForm;
