import Joi from "joi";
import requestType from "./request-type";
import Role from "./role-model";

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tal: number; 
  role: Role;
}

interface ISetModel {
  request: requestType;
  value: string ;
}

class UserModel {
  private readonly _id: number; // Use with underscore prefix to distinguish the properties from the getter and setter methods.
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _password: string;
  private _tal: number;
  private _role: Role;

  public constructor(user: IUser) {
    this._id = user.id;
    this._firstName = user.firstName;
    this._lastName = user.lastName;
    this._email = user.email;
    this._password = user.password;
    this._tal = user.tal ;
    this._role = user.role ?? Role.User;
  }

  public get id() {
    return this._id;
  }

  // Todo - The ID should not be mutable, find a way to hash a number when the object is created

  public get firstName(): string {
    return this._firstName;
  }

  public set firstName(setObject: ISetModel) {
    this.validateProperty('firstName', setObject);
    if (typeof setObject.value === "string") {
      this._firstName = setObject.value;
    } else {
      throw new Error("Invalid type for firstName. Expected a string.");
    }
  }

  public get lastName(): string {
    return this._lastName;
  }

  public set lastName(setObject: ISetModel) {
    this.validateProperty('lastName', setObject);
    if (typeof setObject.value === "string") {
      this._lastName = setObject.value;
    } else {
      throw new Error("Invalid type for lastName. Expected a string.");
    }
  }

  public get email(): string {
    return this._email;
  }

  public set email(setObject: ISetModel) {
    this.validateProperty('email', setObject);
    if (typeof setObject.value === "string") {
      this._email = setObject.value;
    } else {
      throw new Error("Invalid type for email. Expected a string.");
    }
  }

  public get password(): string {
    return this._password;
  }

  public set password(setObject: ISetModel) {
    this.validateProperty('password', setObject);
    if (typeof setObject.value === "string") {
      this._password = setObject.value;
    } else {
      throw new Error("Invalid type for password. Expected a string.");
    }
  }

  public get tal(): number {
    return this._tal;
  }

  public set tal(setObject: ISetModel) {
    this.validateProperty('tal', setObject);
    if (typeof setObject.value === "number") {
      this._tal = setObject.value;
    } else {
      throw new Error("Invalid type for tal. Expected a number.");
    }
  }
// Record<T, K> is a TypeScript utility type that constructs an object type whose keys are T and values are K.
//  Omit<IUser, 'id' | 'role'> creates a new type based on the IUser interface but omits the id and role properties. Essentially, it's a version of IUser without id and role.
//   private static validationSchemas: Record<keyof Omit<IUser, 'id' | 'role'>, ObjectSchema> = {
  private static validationSchemas = {
    firstName: Joi.string().min(2).max(25),
    lastName: Joi.string().min(2).max(20),
    email: Joi.string().email().min(5).max(30),
    password: Joi.string().min(4).max(20),
    tal: Joi.number().min(100000000).max(999999999),
  };

  private hashId(id: number): number {
    // Implement your hashing logic here.
    // For example, a simple hashing could be: return id * 1000;
    // For a real-world application, use a proper hashing function.
    return id; // Placeholder, replace with actual hashing logic.
  }
  
  private validateProperty(propertyName: keyof IUser, setObject: ISetModel): void {
    if (!['firstName', 'lastName', 'email', 'password', 'tal'].includes(propertyName)) {
      throw new Error(`Invalid property name: ${propertyName}`);
    }

    const schema = UserModel.validationSchemas[propertyName];
    const validatedSchema = setObject.request === requestType.Patch ? schema.optional() : schema.required();
    const { error } = validatedSchema.validate(setObject.value, { abortEarly: false });

    if (error) {
      throw new Error(`Validation failed for ${propertyName}: ${error.message}`);
    }
  }

}

export default UserModel;
