import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/credentials-model";
import { UnauthorizedError} from "../4-models/errors-model";
import UserModel from "../4-models/user-model";


// Register
async function register(user: UserModel): Promise<string> {

    const error = user.validatePostRegister();

    if (error) {
        throw new UnauthorizedError(error)
    };

    const sql = `INSERT INTO users(firstName, lastName, email, id, tal, password, role)
    VALUES(?,?,?,?,?,?,?)`;

    await dal.execute(sql,[user.firstName, user.lastName, user.email, user.id, user.tal, user.password, user.role] );

    // Generate token:
    const token = cyber.getNewToken(user);

    return token
};

async function login(credentials: CredentialsModel): Promise<string> {

    // Joi Validation
    const error = credentials.validatePostLogin();
    if (error) {
        throw new UnauthorizedError(error)
    };

    // Get the user by username 
    const sql = `SELECT * FROM users WHERE email = '${credentials.email}'`;

    const result = await dal.execute(sql);

    const verifyCredentials = credentials.email == result[0].email && credentials.password == result[0].password


    if (error || !verifyCredentials) {
        throw new UnauthorizedError("Incorrect username or password Please try again")
    };

    const token = cyber.getNewToken(result[0])

    return token;
};

export default {
    register,
    login
}