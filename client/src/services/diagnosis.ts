import axios from 'axios'
import { Diagnosis } from '../types'

const baseUrl = 'http://localhost:3001/api/diagnoses'

const getAllDiagnoses = async () => {
  const response = await axios.get<Diagnosis[]>(baseUrl)
  return response.data
}

/* eslint-disable import/no-anonymous-default-export */
export default { getAllDiagnoses }
