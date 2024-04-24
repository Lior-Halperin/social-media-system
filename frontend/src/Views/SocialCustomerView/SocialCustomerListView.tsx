import SocialCustomerTable from "src/Components/SocialCustomerTable/SocialCustomerTable";
import useSocialCustomer from "src/hooks/useSocialCustomer";

function SocialCustomerView(): JSX.Element {
  // Utilize the custom hook to access socialCustomers data and functionalities
  const {
    socialCustomer,
    error,
    isError,
    isLoading,
    addSocialCustomerMutation,
  } = useSocialCustomer();

  // Function to handle new socialCustomer submission

  if (isLoading) return <div>Loading...</div>;
  //   if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      <SocialCustomerTable socialCustomer={socialCustomer} />
    </>
  );
}

export default SocialCustomerView;
