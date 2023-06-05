import { Circle, LocalHospital, MonitorHeart } from '@mui/icons-material'
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from '../../types'
import { ListItem, ListItemText, Paper, Typography } from '@mui/material'

interface HealthCheckRatingProps {
  entry: HealthCheckEntry
  diagnoses: Diagnosis[]
}

const HealthCheckRatingCard = ({
  entry,
  diagnoses,
}: HealthCheckRatingProps) => {
  const color = () => {
    switch (HealthCheckRating[entry.healthCheckRating]) {
      case 'Healthy':
        return 'green'
      case 'LowRisk':
        return 'khaki'
      case 'HighRisk':
        return 'orange'
      case 'CriticalRisk':
      default:
        return 'red'
    }
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="body1">
        <LocalHospital />
        {entry.date}
      </Typography>
      <Typography variant="subtitle2">{entry.description}</Typography>
      <Typography variant="caption">
        <b>Specialist</b>: {entry.specialist}
      </Typography>
      <Typography variant="caption" component="div">
        <b>Health Rating: </b>
        {HealthCheckRating[entry.healthCheckRating]}
        <MonitorHeart style={{ color: color() }} />
      </Typography>
      {entry.diagnosisCodes?.map((code) => {
        const diagnosis = diagnoses.find((d) => d.code === code)
        return (
          diagnosis && (
            <ListItem key={diagnosis.code}>
              <ListItemText>
                <Circle /> {diagnosis.code} {diagnosis.name}
              </ListItemText>
            </ListItem>
          )
        )
      })}
    </Paper>
  )
}

export default HealthCheckRatingCard
