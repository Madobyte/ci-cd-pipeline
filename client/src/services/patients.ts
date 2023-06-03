import axios from 'axios'
import {
  EntryWithoutId,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Patient,
  PatientFormValues,
} from '../types'

import { apiBaseUrl } from '../constants'

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`)

  return data
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object)

  return data
}

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
  return data
}

const addEntry = async (id: string, newEntry: EntryWithoutId) => {
  const { data } = await axios.post<
    HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry
  >(`${apiBaseUrl}/patients/${id}/entries`, newEntry)
  return data
}

/* eslint-disable import/no-anonymous-default-export */
export default {
  getAll,
  create,
  getPatient,
  addEntry,
}
