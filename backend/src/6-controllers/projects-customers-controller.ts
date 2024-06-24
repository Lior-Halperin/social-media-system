import express, {Request, Response, NextFunction} from 'express';
import logic from '../5-logic/projects-customers-logic'
import ProjectsCustomersModel from '../4-models/projects-customers-model';

const router = express.Router();

// POST http://localhost:3002/api/projects-customers
router.post('/projects-customers', async (request: Request, response: Response, next: NextFunction) => { // upload.single('excelFile'): This is Multer middleware configured to handle a single file upload. The file is expected to come with the form field name excelFile. This middleware processes the incoming file and attaches it to the req (request) object.
  try{
    const projectCustomer = new ProjectsCustomersModel(request.body)
    const addedProject = await logic.addProjectsCustomers(projectCustomer)

      response.json(addedProject);
    }
    catch(err:any){
        next(err)
    }
});


//  GET http://localhost:3002/api/projects-customers
router.get('/projects-customers/:id([0-9]+)', async (request: Request, response: Response, next: NextFunction) => { // upload.single('excelFile'): This is Multer middleware configured to handle a single file upload. The file is expected to come with the form field name excelFile. This middleware processes the incoming file and attaches it to the req (request) object.
    try{
        const projectId = +request.params.id;
        const projectsCustomers = await logic.getProjectCustomerDetailsByProjectId(projectId)
  
        response.json(projectsCustomers);
      }
      catch(err:any){
          next(err)
      }
  });

  //  delete http://localhost:3002/api/projects-customers
router.delete('/projects-customers', async (request: Request, response: Response, next: NextFunction) => { // upload.single('excelFile'): This is Multer middleware configured to handle a single file upload. The file is expected to come with the form field name excelFile. This middleware processes the incoming file and attaches it to the req (request) object.
    try{
        const projectCustomer = request.body
       await logic.deleteProjectCustomerByCustomerId(projectCustomer)
  
        response.json(204);
      }
      catch(err:any){
          next(err)
      }
  });

export default router;