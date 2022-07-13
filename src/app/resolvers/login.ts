import loginService from "../../services/login";

const login = async ({
  name,
  password,
}: {
  name: string;
  password: string;
}) => {
  return await loginService(name, password);
};

export default login;
