import express, {Request, Response, NextFunction} from 'express';
import VolunteerProjectModel from '../4-models/volunteer-project-model';
import logic from '../5-logic/volunteer-projects'

const router = express.Router();

// POST http://localhost:3002/api/volunteer-projects
router.post('/volunteer-projects', async (request: Request, response: Response, next: NextFunction) => { // upload.single('excelFile'): This is Multer middleware configured to handle a single file upload. The file is expected to come with the form field name excelFile. This middleware processes the incoming file and attaches it to the req (request) object.
  try{
    const project = new VolunteerProjectModel(request.body)
    const addedProject = await logic.addVolunteerProject(project)

      response.json(addedProject);
    }
    catch(err:any){
        next(err)
    }
});


//  GET http://localhost:3002/api/volunteer-projects
router.get('/volunteer-projects', async (request: Request, response: Response, next: NextFunction) => { // upload.single('excelFile'): This is Multer middleware configured to handle a single file upload. The file is expected to come with the form field name excelFile. This middleware processes the incoming file and attaches it to the req (request) object.
    try{
      const allProject = await logic.getAllVolunteerProjectsCustomers()
  
        response.json(allProject);
      }
      catch(err:any){
          next(err)
      }
  });

export default router;