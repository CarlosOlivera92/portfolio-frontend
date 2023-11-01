import * as Yup from 'yup';

export const signInForm = {
  title: "Sign In",
  fields: [
    { name: "username", label: "Username", type: "text", validation: Yup.string().required("Username is required") },
    { name: "password", label: "Password", type: "password", validation: Yup.string().required("Password is required") },
  ],
};

export const signUpForm = {
  title: "Sign Up",
  fields: [
    // Username
    {
      name: "username",
      label: "Nombre de usuario",
      type: "text",
      validation: Yup.string().required("Username is required"),
    },
    // Password
    {
      name: "password",
      label: "Contraseña",
      type: "password",
      validation: Yup.string().required("Password is required"),
    },
    {
      name: "repeatPassword",
      label: "Repetir Contraseña",
      type: "password",
      validation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
        .required("Repeat Password is required"),
    },
    // Data Fields
    {
      name: "firstName",
      label: "Nombre",
      type: "text",
      validation: Yup.string().required("First Name is required"),
    },
    {
      name: "lastName",
      label: "Apellido",
      type: "text",
      validation: Yup.string().required("Last Name is required"),
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      validation: Yup.string().email("Invalid email format").required("Email is required"),
    },
    {
      name: "phoneNumber",
      label: "Numero de teléfono",
      type: "number",
      validation: Yup.number().required("Phone Number is required"),
    },
    {
      name: "birthday",
      label: "Fecha de nacimiento",
      type: "date",
      validation: Yup.date().required("Birthday is required"),
    },
    {
      name: "role",
      label: "Rol",
      type: "text",
      validation: Yup.string().required("Role is required"),
    },
  ],
};

export const emailForm = {
  title: "Email",
  fields: [
    { name: "email", label: "Email", type: "text", validation: Yup.string().email("Invalid email format").required("Email is required") },
  ],
};
