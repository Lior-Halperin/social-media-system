import Joi from "joi";

class CredentialsModel {

   public email: string;
   public password: string;

   public constructor(user: CredentialsModel) {
    this.email = user.email;
    this.password = user.password;
   }

   // POST login Validation Schema:
   private static postCredentialSchema = Joi.object({
    email: Joi.string().email().min(5).max(30),
    password: Joi.string().required().min(4).max(15),
   });

   // Validate Post login:
   public validatePostLogin(): string {
    const result = CredentialsModel.postCredentialSchema.validate(this,{abortEarly:false})
    if (result.error){
        return 'The credential details are incorrect'
    }
   }
} 

export default CredentialsModel;


