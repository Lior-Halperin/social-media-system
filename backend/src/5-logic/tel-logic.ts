import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import Tel from "../4-models/tel-model";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../4-models/errors-model";
import { PoolConnection } from "mysql2";

async function addTel(tel: Tel, dbConnection?: PoolConnection): Promise<Tel> {
  try {
    // Todo: Add validation for tel.

    // 1. Check if the tel already exists in a DB.
    const telCustomer = await getTelByTelNumber(tel.telNumber, false);

    if (telCustomer.length > 0) {
      throw new ValidationError(
        `Phone number ${tel.telNumber} already exists in the system.`
      );
    }
    // 2. Add new tel for this customer.
    const sqlQuery = `INSERT INTO tel(tel_id, customer_id, tel_number) VALUES (?, ?, ?)`;

    await dal.execute(
      sqlQuery,
      [tel.telId, tel.customerId, tel.telNumber],
      dbConnection
    );
    // Add socket.

    return tel;
  } catch (err) {
    throw err;
  }
}

async function getTelByTelNumber(
  telNumber: number,
  displayError: boolean | true
): Promise<Tel[]> {
  try {
    const sqlQuery: string = `SELECT tel_id AS telId, customer_id AS customerId, tel_number AS telNumber, update_date AS updateDate FROM tel WHERE tel_number = ?`;
    const result: Tel[] = await dal.execute(sqlQuery, [telNumber]);

    if (result.length === 0 && displayError) {
      throw new ResourceNotFoundError(telNumber);
    }

    return result;
  } catch (err) {
    throw err;
  }
}

// Update full tel of the customer.
async function updateFullTel(
  telDetails: Tel,
  dbConnection?: PoolConnection
): Promise<Tel> {
  try {
    // Todo: Add validation for check telDetails.
    const sqlQuery = `UPDATE tel SET
         tel_id = ?,
         customer_id= ?,
         tel_number= ?,
         updateDate = ?
         `;

    const result: OkPacket = await dal.execute(
      sqlQuery,
      [
        telDetails.telId,
        telDetails.customerId,
        telDetails.telNumber,
        telDetails.updateDate,
      ],
      dbConnection
    );

    if (result.affectedRows === 0) {
      throw new ResourceNotFoundError(telDetails.customerId);
    }

    // Todo - socket

    return telDetails;
  } catch (err) {
    throw err;
  }
}
export default { addTel, updateFullTel, getTelByTelNumber };
