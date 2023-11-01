/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import FormSection from "../../molecules/form-section/form-section";
import ActionButton from "../../atoms/action-button/action-button";
import { useEffect, useState } from "react";
import Logo from "../../atoms/logo/logo";

const Form = ({ title, fields, onSubmit }) => {
  const isSignUp = fields.title === "Sign Up";

  const [currentStep, setCurrentStep] = useState(1);

  const steps = isSignUp
    ? {
        1: ["username"],
        2: ["password", "repeatPassword"],
        3: ["firstName", "lastName", "email", "phoneNumber", "birthday", "role"],
      }
    : null;

  const currentFields = isSignUp ? steps[currentStep] : fields.fields;

  const initialValues = currentFields.reduce((acc, fieldName) => {
    const field = fields.fields.find((f) => f.name === fieldName);
    if (field) {
      acc[field.name] = "";
    }
    return acc;
  }, {});

  const validationSchema = Yup.object().shape(
    currentFields.reduce((acc, fieldName) => {
      const field = fields.fields.find((f) => f.name === fieldName);
      if (field) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {})
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (isSignUp && currentStep < Object.keys(steps).length) {
        // Si no es el último paso y es el formulario "Sign Up", avanza al siguiente
        setCurrentStep(currentStep + 1);
      } else {
        // Es el último paso o es el formulario "Sign In", envía el formulario
        onSubmit(values);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <div className="form-header d-flex flex-column">
        <Logo />
        <h2>{title}</h2>
      </div>
      <FormSection
        title={fields.title}
        fields={fields.title === "Sign In" ? fields.fields : fields.fields.filter((field) => currentFields.includes(field.name))}
        values={formik.values}
        errors={formik.errors}
        handleChange={formik.handleChange}
      />
      <div className="buttons">
        <ActionButton
          type={"submit"}
          name={isSignUp ? (currentStep < Object.keys(steps).length ? "Siguiente" : "Enviar") : "Iniciar sesión"}
          classname="mt-3 form-button"
          disabled={!formik.isValid}
        />
      </div>
    </form>
  );
};

export default Form;
