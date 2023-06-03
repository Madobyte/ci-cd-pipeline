import {
	FormControl,
	Input,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
	Chip,
	Box,
	SelectChangeEvent,
	FormGroup,
	FormLabel,
	Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import diagnosisService from "../../../services/diagnosis";
import patientService from "../../../services/patients";
import { Diagnosis, EntryFormProps, EntryWithoutId } from "../../../types";
import { useParams } from "react-router-dom";

const HospitalEntryForm = ({ patient, setPatient, close }: EntryFormProps) => {
	const id = useParams().id;
	const [codes, setCodes] = useState<Diagnosis[]>();

	const [entryDate, setEntryDate] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [specialist, setSpecialist] = useState("");
	const [description, setDescription] = useState("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [dischargeDate, setDischargeDate] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [criteria, setCriteria] = useState("");

	useEffect(() => {
		diagnosisService
			.getAllDiagnoses()
			.then((codes) => setCodes(codes))
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

	const handleDischargeDateChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const {
			target: { value },
		} = e;

		setDischargeDate(value);
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

	const handleCriteriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = e;
		setCriteria(value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newHospitalEntry: EntryWithoutId = {
			type: "Hospital",
			date: entryDate,
			specialist,
			description,
			diagnosisCodes,
			discharge: {
				date: dischargeDate,
				criteria,
			},
		};

		if (id === undefined) throw new Error("No id");

		const newEntry = await patientService.addEntry(id, newHospitalEntry);
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
			<FormGroup
				style={{
					border: "1px solid rgba(0, 0, 0, 0.2)",
					borderRadius: "5px",
					padding: "20px",
					marginTop: "10px",
				}}
			>
				<FormLabel>Discharge</FormLabel>
				<FormControl fullWidth margin="dense" required>
					<InputLabel>Date</InputLabel>
					<Input
						type="date"
						fullWidth
						value={dischargeDate}
						onChange={handleDischargeDateChange}
					/>
				</FormControl>
				<TextField
					label="Criteria"
					fullWidth
					margin="dense"
					value={criteria}
					onChange={handleCriteriaChange}
					required
				/>
			</FormGroup>
			<FormControl margin="dense">
				<Button type="submit" variant="contained">
					Submit
				</Button>
			</FormControl>
		</form>
	);
};

export default HospitalEntryForm;
