import dal from "../2-utils/dal";
import ProjectsCustomersModel from "../4-models/projects-customers-model";
import ProjectCustomerDetailsModel from "../4-models/project-customer-details-model";

async function addProjectsCustomers(projectCustomer: ProjectsCustomersModel): Promise<ProjectsCustomersModel> {
  try {
    const query = `INSERT INTO projects_customers(customer_id, project_id) VALUES(?,?)`;
    await dal.execute(query, [
      projectCustomer.customerId,
      projectCustomer.projectId,
    ]);

    return projectCustomer;
  } catch (err: any) {
    throw err;
  }
}

async function getProjectCustomerDetailsByProjectId(projectId: number): Promise<ProjectCustomerDetailsModel[]> {
  try {
    const query = `SELECT pc.project_id, vp.name, vp.date, sc.customer_id, sc.first_name, sc.last_name, sc.tal, st.street_id, st.hebrew_name, ad.address_id, ad.house_number, ad.apartment_number, ad.floor FROM projects_customers AS pc JOIN social_customers AS sc ON pc.customer_id = sc.customer_id JOIN addresses AS ad ON ad.customer_id = sc.customer_id JOIN volunteer_projects AS vp ON pc.project_id = vp.project_id JOIN streets AS st ON st.street_id = ad.street_id WHERE pc.project_id = ${projectId};`;
    const result = await dal.execute(query);
    return result;
  } catch (err: any) {
    throw err;
  }
}

async function deleteProjectCustomerByCustomerId(projectCustomer: ProjectsCustomersModel): Promise<void>{
 
    const sql = `DELETE FROM projects_customers WHERE customer_id=${projectCustomer.customerId} AND project_id=${projectCustomer.projectId};`
    await dal.execute(sql)
}

export default { addProjectsCustomers, getProjectCustomerDetailsByProjectId, deleteProjectCustomerByCustomerId };

//SELECT * from `projects_customers` JOIN `socialcustomer` ON projects_customers.customerId = socialcustomer.customerId;

// SELECT * FROM socialcustomer s JOIN addresses a ON s.customerId = a.customerId

// INSERT INTO streets (city_id, hebrew_name, english_name) VALUES (10, 'נורדאו', 'nordeu') ;

// INSERT INTO addresses (customerId, city_id, streetId, houseNumber, floor) VALUES (3, 10, 0, 30, 1);
