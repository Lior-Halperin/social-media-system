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
import Dropdown from "src/Components/Dropdown/Dropdown";
import useStreets from "src/hooks/useStreets";
import { useCallback, useState } from "react";

function AddSocialCustomerView(): JSX.Element {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISocialCustomerModel>();

  const [selectedCity, setSelectedCity] = useState<string>('')

  const handelSelectedCity = useCallback((city:string)=>{
    try{
        console.log(`Selected city: ${city}`)
        setSelectedCity(city)
    }
    catch(err){
        console.log(err)
    }
  },[])
  const { error, isError, addSocialCustomerMutation } = useSocialCustomer();

  const citiesResponse = useCities("israel", "he"); // Todo: 
  const streetsList = useStreets("israel", selectedCity); 

  async function onSubmit(product: ISocialCustomerModel) {
    try {
      addSocialCustomerMutation.mutate(product);
      console.log(product);
      navigate("/");
    } catch (err: any) {
      console.log(err);
    }
  }

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

        <Dropdown
          options={citiesResponse.cities}
          renderOption={(option) => <span>{option}</span>}
          onSelect={(i) => handelSelectedCity(i)}
          placeholder= {citiesResponse.isLoading ? "Loading cities..":"Select city"}
        />

        {selectedCity && 
                <Dropdown
                options={streetsList.streets.streets}
                renderOption={(option) => <span>{option}</span>}
                onSelect={(i) => console.log(i)}
                placeholder={streetsList.isLoading ? "Loading streets..." : "Select street"}
              />
        }
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
