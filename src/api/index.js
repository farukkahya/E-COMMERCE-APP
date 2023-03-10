import axios from "axios";

export const fetchProductList = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/products?page=${pageParam}`);
  return data;
};

export const fetchRegister = async (input) => {
  const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/users/`, input);
  return data;
}