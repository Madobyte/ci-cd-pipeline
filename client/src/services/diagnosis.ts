import axios from 'axios'
import { Diagnosis } from '../types'

const baseUrl = 'https://ci-cd-pipeline.fly.dev/api/diagnoses'

const getAllDiagnoses = async () => {
  const response = await axios.get<Diagnosis[]>(baseUrl)
  return response.data
}

export default { getAllDiagnoses }
