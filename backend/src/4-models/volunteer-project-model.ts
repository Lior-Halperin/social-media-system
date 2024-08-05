import tools from "../2-utils/tools";

interface IVolunteerProjectModel {
  projectId: number;
  name: string;
  date: Date;
}

class VolunteerProjectModel implements IVolunteerProjectModel{
    private _projectId: number;
    private _name: string;
    private _date: Date

  public constructor(project: IVolunteerProjectModel) {
      this._projectId = tools.generateId(999999,10000)
      this._name = project.name;
      this._date = project.date
  }

  public get projectId() {
    return this._projectId;
  }

  public get name() {
    return this._name;
  }

  public get date(){
    return this._date
  }
}

export default VolunteerProjectModel;
