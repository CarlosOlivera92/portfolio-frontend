import * as Yup from 'yup';

export const signInForm = {
  title: "Sign In",
  fields: [
    { name: "username", label: "Nombre de usuario", type: "text", validation: Yup.string().required("El nombre de usuario es requerido") },
    { name: "password", label: "Contraseña", type: "password", validation: Yup.string().required("La contraseña es requerida") },
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
      validation: Yup.string().required("El nombre de usuario es requerido").min(6, "El nombre de usuario debe tener al menos 6 caracteres").matches(/^[^@]+$/, "El nombre de usuario no puede ser un correo electrónico"),
    },
    // Password
    {
      name: "password",
      label: "Contraseña",
      type: "password",
      validation: Yup.string().required("La contraseña es requerida") .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe contener al menos una mayúscula, un número y un carácter especial"
      ),
    },
    {
      name: "repeatPassword",
      label: "Repetir Contraseña",
      type: "password",
      validation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
        .required("Este campo es requerido"),
    },
    // Data Fields
    {
      name: "firstName",
      label: "Nombre",
      type: "text",
      validation: Yup.string().required("El nombre es requerido").matches(/^[a-zA-Z ]{4,}$/, "El nombre debe contener al menos 4 letras y no debe contener números ni caracteres especiales"),
    },
    {
      name: "lastName",
      label: "Apellido",
      type: "text",
      validation: Yup.string().required("El apellido es requerido").matches(/^[a-zA-Z ]{4,}$/, "El apellido debe contener al menos 4 letras y no debe contener números ni caracteres especiales")
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      validation: Yup.string().email("Formato de email inválido").required("El email es requerido").matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, "Formato de email inválido"),
    },
    {
      name: "phoneNumber",
      label: "Numero de teléfono",
      type: "number",
      validation: Yup.number().required("El número de teléfono es requerido").min(6, "El número de teléfono debe tener al menos 6 dígitos"),
    },
    {
      name: "birthday",
      label: "Fecha de nacimiento",
      type: "date",
      validation: Yup.date().required("La fecha de nacimiento es requerida").min(new Date("1960-01-01"), "La fecha de nacimiento debe ser posterior a 1960-01-01"),
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
    {
      name: "email",
      label: "Email",
      type: "text",
      validation: Yup.string().email("Formato de email inválido").required("El email es requerido").matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, "Formato de email inválido"),
    }
  ],
};
export const resetPasswordForm = {
  title: "Reset Password",
  fields: [
    {
      name: "newPassword",
      label: "Nueva contraseña",
      type: "password",
      validation: Yup.string().required("La contraseña es requerida") .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe contener al menos una mayúscula, un número y un carácter especial"
      ),
    },
    {
      name: "repeatPassword",
      label: "Repetir contraseña",
      type: "password",
      validation: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden")
        .required("Este campo es requerido"),
    },
  ]
}
