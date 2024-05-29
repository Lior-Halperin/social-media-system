interface IProjectsCustomersModel {
    customerId: number;
    projectId: number;
  }
  
  class ProjectsCustomersModel implements IProjectsCustomersModel{
    private _customerId: number;
    private _projectId: number;
  
    public constructor(project: IProjectsCustomersModel) {
      this._customerId = project.customerId;
      this._projectId = project.projectId;
    }
  
    public get customerId() {
      return this._customerId;
    }
  
    public get projectId() {
      return this._projectId;
    }
  }
  
  export default ProjectsCustomersModel;
  