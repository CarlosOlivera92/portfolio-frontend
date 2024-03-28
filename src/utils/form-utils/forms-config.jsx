import * as Yup from 'yup';

export const signInForm = {
  title: "Sign In",
  fields: [
    { name: "username", label: "Nombre de usuario", type: "text", validation: Yup.string()
    .trim() // Elimina espacios en blanco al principio y al final
    .required("El nombre de usuario es requerido")
    .min(6, "El nombre de usuario debe tener al menos 6 caracteres")
    .matches(/^[^@]+$/, "No está permitido el uso del correo electrónico"), },
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
      validation: Yup.string()
        .trim() // Elimina espacios en blanco al principio y al final
        .required("El nombre de usuario es requerido")
        .min(6, "El nombre de usuario debe tener al menos 6 caracteres")
        .matches(/^[^@]+$/, "El nombre de usuario no puede ser un correo electrónico"),
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
            validation: Yup.string().trim().required('El campo es requerido')
        },
        {
            name: 'companyName',
            label: 'Empresa',
            type: 'text',
            validation: Yup.string().trim().required('El campo es requerido'),
        },
        {
            name: 'startDate',
            label: 'Desde',
            type: 'date',
            validation: Yup.date().required("La fecha de inicio es requerida").min(new Date("1960-01-01"), "La fecha debe ser posterior a 1960-01-01"),
        },
        {
            name: 'endDate',
            label: 'Hasta',
            type: 'date',
            validation: Yup.date()
            .nullable()
        },
        {
            name: 'summary',
            label: 'Descripción',
            type: 'textarea',
            validation: Yup.string().trim(),
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
      name: 'startDate',
      label: 'Desde',
      type: 'date',
      validation: Yup.date().required('El campo es requerido'),
    },
    {
      name: 'endDate',
      label: 'Hasta',
      type: 'date',
      validation: Yup.date()
        .nullable()
    },
    {
      name: 'focusOfStudies',
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
      name: 'startDate',
      label: 'Desde',
      type: 'date',
      validation: Yup.date().required('El campo es requerido'),
    },
    {
      name: 'endDate',
      label: 'Hasta',
      type: 'date',
      validation: Yup.date()
        .nullable()
    },
    {
      name: 'focusOfStudies',
      label: 'Descripción',
      type: 'textarea',
      validation: Yup.string().required('El campo es requerido'),
    },
  ],
};
export const certificatesForm = {
  title: 'Editar Certificados',
  fields: [
    /*
    {
      name: 'academy',
      label: 'Academia',
      type: 'text',
      validation: Yup.string().required('El campo es requerido'),
    },*/
    {
      name: 'degree',
      label: 'Titulación',
      type: 'text',
      validation: Yup.string().required('El campo es requerido'),
    },
    {
      name: 'certificationUrl',
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
      name: "jobPosition",
      label: "Puesto o Grado Actual",
      type: "text",
      validation: Yup.string().required("El campo es requerido"),
    },
    {
      name: "address",
      label: "Dirección",
      type: "text",
      validation: Yup.string().required("El campo es requerido"),
    },
    {
      name: "githubProfileUrl",
      label: "Perfil de GitHub",
      type: "text",
      validation: Yup.string().url("Debe ser una URL válida").nullable(),
    },
    {
      name: "linkedinProfileUrl",
      label: "Perfil de LinkedIn",
      type: "text",
      validation: Yup.string().url("Debe ser una URL válida").nullable(),
    },
    {
      name: "aboutMe",
      label: "Acerca de Mí",
      type: "textarea",
      validation: Yup.string().nullable(),
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
      name: 'summary',
      label: 'Descripción',
      type: 'text',
      validation: Yup.string(),
    },
    {
      name: 'projectUrl',
      label: 'Vínculo al Proyecto',
      type: 'text',
      validation: Yup.string()
        .url('Formato de URL inválido'),
    },
    {
      name: 'projectRepoUrl',
      label: 'Vínculo al repositorio',
      type: 'text',
      validation: Yup.string()
        .url('Formato de URL inválido')
        .required('El campo es requerido'),
    },
  ],
};
export const profilePicUrlForm = {
  title: "Editar foto de perfil",
  fields: [
    {
      name: "file",
      label: "Subir foto de perfil",
      type: "file", 
      accept: "image/*",
      validation: Yup.mixed()
        .required("El campo es requerido")
        .test(
          "file-size",
          "La imagen no debe exceder 1 MB",
          (value) => {
            if (!value) return true; // Permitir que el campo esté vacío
            return value && value.size <= 1024 * 1024; // 1 MB en bytes
          }
        ),
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
