import { ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import { Circle, LocalHospital, Work } from "@mui/icons-material";

interface OccupationalHealthcareProps {
	entry: OccupationalHealthcareEntry;
	diagnoses: Diagnosis[];
}
const OccupationalHealthcareCard = ({
	entry,
	diagnoses,
}: OccupationalHealthcareProps) => {
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
				<Work /> <b>Employer name: </b> {entry.employerName}
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

export default OccupationalHealthcareCard;
