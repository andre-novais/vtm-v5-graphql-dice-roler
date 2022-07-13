import signUpService from "../../services/signUp";

const signUp = async ({
  name,
  password,
}: {
  name: string;
  password: string;
}) => {
  return await signUpService(name, password);
};

export default signUp;
