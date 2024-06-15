import * as yup from "yup";

export const OfferSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  name: yup.string().required(),
});
