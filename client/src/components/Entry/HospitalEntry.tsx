import { Circle, Healing, LocalHospital } from "@mui/icons-material";
import { Diagnosis, HospitalEntry } from "../../types";
import { ListItem, ListItemText, Paper, Typography } from "@mui/material";

interface HospitalEntryProps {
	entry: HospitalEntry;
	diagnoses: Diagnosis[];
}

const HospitalEntryCard = ({ entry, diagnoses }: HospitalEntryProps) => {
	return (
		<Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
			<Typography variant="body1">
				<LocalHospital />
				{entry.date}
			</Typography>
			<Typography variant="subtitle2">{entry.description}</Typography>
			<Typography variant="caption">
				<b>Specialist</b>: {entry.specialist}
			</Typography>
			<Typography variant="caption" component="div">
				<b>Discharge ({entry.discharge.date}): </b>
				{entry.discharge.criteria} <Healing />
			</Typography>
			{entry.diagnosisCodes?.map((code) => {
				const diagnosis = diagnoses.find((d) => d.code === code);
				if (diagnosis !== undefined)
					return (
						<ListItem key={diagnosis.code}>
							<ListItemText>
								<Circle /> {diagnosis.code} {diagnosis.name}
							</ListItemText>
						</ListItem>
					);
			})}
		</Paper>
	);
};

export default HospitalEntryCard;
