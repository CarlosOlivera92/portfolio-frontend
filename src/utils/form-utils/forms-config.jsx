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

export const bannerForm = {
  title: "Editar Banner",
  fields: [
    {
      name: "bannerPicUrl",
      label: "URL del banner",
      type: "text",
      validation: Yup.string()
        .url("Formato de URL inválido")
        .required("El campo es requerido"),
    }
  ]
}

export const experienceForm = {
  title: 'Editar Experiencia Laboral',
  fields: [
    {
      name: 'jobTitle',
      label: 'Nombre del Cargo',
      type: 'text',
      validation: Yup.string().required('El campo es requerido'),
    },
    {
      name: 'company',
      label: 'Empresa',
      type: 'text',
      validation: Yup.string().required('El campo es requerido'),
    },
    {
      name: 'fromDate',
      label: 'Desde',
      type: 'date',
      validation: Yup.date().required('El campo es requerido'),
    },
    {
      name: 'toDate',
      label: 'Hasta',
      type: 'date',
      validation: Yup.date()
        .nullable()
        .when('fromDate', (fromDate, schema) =>
          schema.min(fromDate, 'Debe ser mayor que la fecha de inicio')
        ),
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
      validation: Yup.string().required('El campo es requerido'),
    },
  ],
};
export const educationForm = {
  title: 'Editar Educación',
  fields: [
    {
      name: 'institution',
      label: 'Nombre de la Institución',
      type: 'text',
      validation: Yup.string().required('El campo es requerido'),
    },
    {
      name: 'degree',
      label: 'Titulación',
      type: 'text',
      validation: Yup.string().required('El campo es requerido'),
    },
    {
      name: 'fromDate',
      label: 'Desde',
      type: 'date',
      validation: Yup.date().required('El campo es requerido'),
    },
    {
      name: 'toDate',
      label: 'Hasta',
      type: 'date',
      validation: Yup.date()
        .nullable()
        .when('fromDate', (fromDate, schema) =>
          schema.min(fromDate, 'Debe ser mayor que la fecha de inicio')
        ),
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
      validation: Yup.string().required('El campo es requerido'),
    },
  ],
};
export const coursesForm = {
  title: 'Editar Cursos',
  fields: [
    {
      name: 'courseName',
      label: 'Nombre del Curso',
      type: 'text',
      validation: Yup.string().required('El campo es requerido'),
    },
    {
      name: 'institution',
      label: 'Institución',
      type: 'text',
      validation: Yup.string().required('El campo es requerido'),
    },
    {
      name: 'certificateLink',
      label: 'Vínculo al Certificado',
      type: 'text',
      validation: Yup.string()
        .url('Formato de URL inválido')
        .required('El campo es requerido'),
    },
  ],
};
export const certificatesForm = {
  title: 'Editar Certificados',
  fields: [
    {
      name: 'academy',
      label: 'Academia',
      type: 'text',
      validation: Yup.string().required('El campo es requerido'),
    },
    {
      name: 'degree',
      label: 'Titulación',
      type: 'text',
      validation: Yup.string().required('El campo es requerido'),
    },
    {
      name: 'certificateLink',
      label: 'Vínculo al Certificado',
      type: 'text',
      validation: Yup.string()
        .url('Formato de URL inválido')
        .required('El campo es requerido'),
    },
  ],
};
export const personalDataForm = {
  title: "Editar Datos Personales",
  fields: [
    {
      name: "currentPosition",
      label: "Puesto o Grado Actual",
      type: "text",
      validation: Yup.string().required("El campo es requerido"),
    },
    {
      name: "location",
      label: "Ubicación",
      type: "group", 
      fields: [
        {
          name: "state",
          label: "Estado",
          type: "text",
          validation: Yup.string().required("El campo es requerido"),
        },
        {
          name: "country",
          label: "País",
          type: "text",
          validation: Yup.string().required("El campo es requerido"),
        },
      ],
    },
    {
      name: "aboutMe",
      label: "Acerca de Mí",
      type: "textarea",
      validation: Yup.string().required("El campo es requerido"),
    },
  ],
};
export const projectsForm = {
  title: 'Editar Proyectos',
  fields: [
    {
      name: 'projectName',
      label: 'Nombre del Proyecto',
      type: 'text',
      validation: Yup.string().required('El campo es requerido'),
    },
    {
      name: 'company',
      label: 'Empresa',
      type: 'text',
      validation: Yup.string().required('El campo es requerido'),
    },
    {
      name: 'projectLink',
      label: 'Vínculo al Proyecto',
      type: 'text',
      validation: Yup.string()
        .url('Formato de URL inválido')
        .required('El campo es requerido'),
    },
  ],
};
export const profilePicUrl = {
  title: "Editar foto de perfil",
  fields: [
    {
      name: "profilePicUrl",
      label: "URL de la foto de perfil",
      type: "text",
      validation: Yup.string()
        .url("Formato de URL inválido")
        .required("El campo es requerido"),
    }
  ]
}
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
