import * as yup from "yup";

export const AddUserSchema = yup.object().shape({
  fname: yup.string().required("First Name is required"),
  lname: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  phone: yup.string().required("Phone Number is required"),
  gender: yup.string().required(),
});
