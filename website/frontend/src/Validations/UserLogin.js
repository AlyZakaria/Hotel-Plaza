import * as yup from "yup";

export const UserLoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(16, "Password is too long - should be 20 chars maximum."),
});
