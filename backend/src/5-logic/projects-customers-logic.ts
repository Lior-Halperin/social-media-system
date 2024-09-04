import dal from "../2-utils/dal";
import ProjectsCustomersModel from "../4-models/projects-customers-model";
import ProjectCustomerDetailsModel from "../4-models/project-customer-details-model";
import socketLogic from "./socket-logic";
import SocketEvents from "../4-models/SocketEvents";

async function addProjectsCustomers(
  projectCustomer: ProjectsCustomersModel
): Promise<ProjectsCustomersModel> {
  try {
    const query = `INSERT INTO projects_customers(customer_id, project_id) VALUES(?,?)`;
    await dal.execute(query, [
      projectCustomer.customerId,
      projectCustomer.projectId,
    ]);

    // Report via socket.io a new project customer has been added:
    socketLogic.reportAddNewData(
      projectCustomer,
      SocketEvents.AddedProjectsCustomers
    );

    return projectCustomer;
  } catch (err: any) {
    throw err;
  }
}

async function getProjectCustomerDetailsByProjectId(
  projectId: number
): Promise<ProjectCustomerDetailsModel[]> {
  try {
    const query = `SELECT 
    sc.customer_id AS customerId,
    pc.project_id AS projectId,
    sc.first_name AS firstName,
    sc.last_name AS lastName,
    a.address_id AS addressId,
    a.country,
    a.city,
    a.street,
    a.house_number AS houseNumber,
    a.apartment_number AS apartmentNumber,
    a.floor,
    a.longitude,
    a.latitude,
    a.distance_km_from_intentional_point AS distanceKmFromIntentionalPoint,
    a.update_date AS addressUpdateDate,
    a.comments
FROM 
    projects_customers pc
JOIN 
    social_customers sc ON pc.customer_id = sc.customer_id
LEFT JOIN 
    addresses a ON sc.customer_id = a.customer_id
WHERE 
    pc.project_id = ${projectId};
`;

/*
 Todo: The gpt brought a solution to insert tel as an array
 but you need to update xampp and mysql.
*/
    const result = await dal.execute(query);

    return result;
  } catch (err: any) {
    throw err;
  }
}

async function deleteProjectCustomerByCustomerId(
  projectCustomer: ProjectsCustomersModel
): Promise<void> {
  const sql = `DELETE FROM projects_customers WHERE customer_id=${projectCustomer.customerId} AND project_id=${projectCustomer.projectId};`;
  await dal.execute(sql);
}

export default {
  addProjectsCustomers,
  getProjectCustomerDetailsByProjectId,
  deleteProjectCustomerByCustomerId,
};


