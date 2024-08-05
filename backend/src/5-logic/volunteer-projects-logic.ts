import dal from "../2-utils/dal";
import VolunteerProjectModel from "../4-models/volunteer-project-model";
import VolunteerProject from "../4-models/volunteer-project-model";

async function addVolunteerProject(project: VolunteerProject): Promise<VolunteerProject> {
  try {
    const query = `INSERT INTO volunteer_projects(project_id, name, date) VALUES(?,?,?)`;
    await dal.execute(query, [
        project.projectId,
      project.name,
      project.date,
    ]);

    return project;

  } catch (err: any) {
    throw err;
  }
}

async function getAllVolunteerProjectsCustomers(): Promise<VolunteerProjectModel[]>{
    try{
        const query = "SELECT * FROM volunteer_projects";
        const existingVolunteerProjects = dal.execute(query)
        
        return existingVolunteerProjects
    }
    catch (err:any){
        throw err;
    }
}


export default { addVolunteerProject, getAllVolunteerProjectsCustomers };
