import Joi from "joi";
import Role from "./role-model";

class UserModel {

    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public tal: string;
    public role: Role;
     
    // Copy - Constructor
    public constructor(user: UserModel) {
        this.id = this.randomId();
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.tal = user.tal
        this.role = user.role;
    }

    private randomId(): number {
        const randomIdNumber = Math.floor(Math.random() * 10000000)
        return randomIdNumber
    }

    // Model validation:

    // POST register Validation Schema:
    private static postRegisterValidationSchema = Joi.object({
        id: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(25),
        lastName: Joi.string().required().min(2).max(25),
        email: Joi.string().email().min(5).max(30),
        password: Joi.string().required().min(4).max(15),
        tal: Joi.number().required().min(1000000000).max(999999999),
        role: Joi.string().required().validate([Role.Admin,Role.Manager,Role.User])
    });

    // Validate POST register:
    public validatePostRegister() : string {
        const result = UserModel.postRegisterValidationSchema.validate(this,{abortEarly:false});
        return result.error?.message;
    };

};



export default UserModel;