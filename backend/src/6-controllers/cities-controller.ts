import express, {Request, Response, NextFunction} from 'express';
import multer from 'multer';
import * as XLSX from 'xlsx';
import logic from '../5-logic/cities-logic';
import CityModel from '../4-models/city-model';
import fs from "fs/promises";

const router = express.Router();
const upload = multer({ dest: './src/1-assets/uploads/cities' }); // The { dest: 'uploads/' } configuration tells Multer to save uploaded files in a directory named uploads in your project's root folder.

// POST http://localhost:3001/api/upload/cities
router.post('/upload-file/cities', upload.single('excelFile'), async (request: Request, response: Response, next: NextFunction) => { // upload.single('excelFile'): This is Multer middleware configured to handle a single file upload. The file is expected to come with the form field name excelFile. This middleware processes the incoming file and attaches it to the req (request) object.
  try{
      const workbook = XLSX.readFile(request.file.path); //  This line uses the XLSX library to read the Excel file that has been uploaded. req.file.path contains the path to the uploaded file (saved by Multer).
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const cities: CityModel[] = XLSX.utils.sheet_to_json(worksheet); //  This line converts the worksheet data into a JSON array. Each row in the sheet becomes an object in the array, and each cell in a row becomes a property of the corresponding object.
      await fs.rm(request.file.path, { recursive: true, force: true }); // Delete uploads file.

      const result = await logic.updateFullCities(cities)
      response.json(result);
    }
    catch(err:any){
        next(err)
    }
});

// POST http://localhost:3001/api/add-city
router.post('/add-city', async (request: Request, response: Response, next: NextFunction)=> {
    try{
       const city = new CityModel(request.body)
       const addedCity = await logic.addCity(city)

       response.json(addedCity)
    }
    catch(err: any){
        next(err)
    }
})

// PUT http://localhost:3001/api/edit-city/7 <--id
router.put('/edit-city/:id([0-9]+)', async (request: Request, response: Response, next: NextFunction)=> {
    try{
        request.body.id = +request.body.id
       const city = new CityModel(request.body)
       const editedCity = await logic.updatePartialCity(city)

       response.json(editedCity)
    }
    catch(err: any){
        next(err)
    }
})


export default router;

