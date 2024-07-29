import { useNavigate } from "react-router-dom";
import {
  StyledButton,
  StyledErrorMessage,
  StyledForm,
  StyledInput,
  StyledSelectInput,
  StyledWrapper,
} from "./AddSocialCustomerView.Styled";
import { useForm } from "react-hook-form";
import { ISocialCustomerModel } from "src/Models/SocialCustomerModel";
import useSocialCustomer from "src/hooks/useSocialCustomer";
import useCities from "src/hooks/useCities";

function AddSocialCustomerView(): JSX.Element {

  const navigate = useNavigate();

 const { register, handleSubmit, formState: { errors } } = useForm<ISocialCustomerModel>();



  // Proceed with submission logic here, such as sending data to a backend server

  const {
      error,
      isError,
      addSocialCustomerMutation,
    } = useSocialCustomer();  

    const {cities} = useCities('israel');

  async function onSubmit(product: ISocialCustomerModel) {
    try {
         addSocialCustomerMutation.mutate(product)
          console.log(product)
          navigate("/")
      }
      catch (err: any) {
          console.log(err)
      }
  };

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First Name:</label>
        <StyledInput
          id="firstName"
          {...register("firstName", { required: "First Name is required" })}
        />
        {errors.firstName && (
          <StyledErrorMessage>{errors.firstName.message}</StyledErrorMessage>
        )}

        <label htmlFor="lastName">Last Name:</label>
        <StyledInput
          id="lastName"
          {...register("lastName", { required: "Last Name is required" })}
        />
        {errors.lastName && (
          <StyledErrorMessage>{errors.lastName.message}</StyledErrorMessage>
        )}

        <label htmlFor="city">City:</label>
        <StyledSelectInput name="cites">
            {cities.map((city)=> <option>{city.he}</option>)}
        </StyledSelectInput>
        <label htmlFor="tal">Tal:</label>
        <StyledInput
          id="tal"
          {...register("tal", { required: "Tal is required" })}
        />
        {errors.tal && (
          <StyledErrorMessage>{errors.tal.message}</StyledErrorMessage>
        )}

        <StyledButton type="submit">Add Product</StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
}

export default AddSocialCustomerView;
