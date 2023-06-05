import {
  CloseReason,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { useState } from 'react'
import HospitalEntryForm from './HospitalEntryForm'
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm'
import HealthCheckEntryForm from './HealthCheckEntryForm'
import { Patient } from '../../../types'

interface AddEntryModalProps {
  visible: boolean
  close: (reason: CloseReason) => void
  patient: Patient
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>
}

const AddEntryModal = ({
  visible,
  close,
  patient,
  setPatient,
}: AddEntryModalProps) => {
  const [entryType, setEntryType] = useState<string | null>('Hospital')

  const handleEntryTypeChange = (
    _e: React.MouseEvent<HTMLElement>,
    newEntryType: string | null
  ) => {
    setEntryType(newEntryType)
  }

  return (
    <Dialog fullWidth open={visible} onClose={close}>
      <DialogTitle>Add new entry</DialogTitle>
      <Divider />
      <DialogContent>
        <ToggleButtonGroup
          value={entryType}
          exclusive
          onChange={handleEntryTypeChange}
          fullWidth
        >
          <ToggleButton value="Hospital">Hospital</ToggleButton>
          <ToggleButton value="OccupationalHealthcare">
            Occupational Healthcare
          </ToggleButton>
          <ToggleButton value="HealthCheck">Health Check</ToggleButton>
        </ToggleButtonGroup>

        {entryType === 'Hospital' && (
          <HospitalEntryForm
            patient={patient}
            setPatient={setPatient}
            close={close}
          />
        )}
        {entryType === 'OccupationalHealthcare' && (
          <OccupationalHealthcareEntryForm
            patient={patient}
            setPatient={setPatient}
            close={close}
          />
        )}
        {entryType === 'HealthCheck' && (
          <HealthCheckEntryForm
            patient={patient}
            setPatient={setPatient}
            close={close}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddEntryModal
