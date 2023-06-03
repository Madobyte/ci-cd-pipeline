import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
	res.json(patientService.getPatients());
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	res.json(patientService.getPatient(id));
});

router.post("/", (req, res) => {
	const newPatient = toNewPatientEntry(req.body);
	const patient = patientService.addPatient(newPatient);
	res.json(patient);
});

router.post("/:id/entries", (req, res) => {
	const newEntry = toNewEntry(req.body);
	const id = req.params.id;
	const entry = patientService.addEntry(newEntry, id);
	res.json(entry);
});

export default router;
