
class CredentialsModel {

   public email: string;
   public password: string;

   public constructor(user: CredentialsModel) {

    this.email = user.email;
    this.password = user.password;

   }


   // **Validation needs to be done here....
} 

export default CredentialsModel;


