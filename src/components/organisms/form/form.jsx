import { useFormik } from "formik";
import * as Yup from "yup";
import FormSection from "../../molecules/form-section/form-section";
import ActionButton from "../../atoms/action-button/action-button";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

import Logo from "../../atoms/logo/logo";

const Form = ({ title, fields, onSubmit, currentStep, steps, isSignUp, isUsernameInUse, isUsernameChecked, message, isUserRegistered, onFormComplete, toggleModal }) => {
  const currentFields = isSignUp ? steps[currentStep] : fields.fields.map(field => field.name);
  const [stepTransition, setStepTransition] = useState("form-step-entering");

  const initialValues = {};
  const today = new Date(); // Obtener la fecha de hoy
  for (const fieldName of currentFields) {
    const field = fields.fields.find((f) => {
      return f.name === fieldName;
    });
    if (field) {
      if (field.type === "date") { // Verificar si el campo es de tipo fecha
        initialValues[field.name] = today.toISOString().split('T')[0]; // Establecer la fecha de hoy como valor predeterminado
      } else {
        initialValues[field.name] = ""; // De lo contrario, establecer un valor vacío
      }
    }
  }
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
    onSubmit: async (values, { setSubmitting }) => {
      await onSubmit(values, currentStep);
      setSubmitting(false); 
    }
  });

  const handleFieldChange = (fieldName, value) => {
    formik.setFieldTouched(fieldName, true, false);
    formik.setFieldValue(fieldName, value);
  };
  useEffect(() => {
    setStepTransition("form-step-entering");
    if (currentStep > 1) {
      setStepTransition("form-step-leaving");
      const timeout = setTimeout(() => {
        setStepTransition("form-step-entering");
      }, 0); // Tiempo de transición, ajusta según tus necesidades
      return () => clearTimeout(timeout);
    }
  }, [currentStep]);

  useEffect(() => {
    if (onFormComplete) {
      if (formik.isValid && formik.dirty) {
        onFormComplete(formik);
      }
    }
  }, [formik.values, onFormComplete]);

  return (
    <form onSubmit={formik.handleSubmit} className={`form ${stepTransition}`}>
      {fields.title === 'Sign In' || fields.title === 'Sign Up' ? (
        <div className="form-header d-flex flex-column">
          <Logo />
          <h2>{title}</h2>
        </div>
      ) : (
        <div className="form-header d-flex flex-column">
          <h2>{title}</h2>
        </div>
      )}

      <FormSection
        title={fields.title}
        fields={fields.title === "Sign In" || fields.title === "Email" || fields.title === " " ? fields.fields  : fields.fields.filter((field) => currentFields.includes(field.name))}
        values={formik.values}
        errors={formik.errors}
        handleChange={handleFieldChange}
        isUsernameInUse={isUsernameInUse}
        isUsernameChecked={isUsernameChecked}
        message={message}
        isUserRegistered={isUserRegistered}
      />
      {fields.title === 'Sign In' || fields.title === 'Sign Up'  || fields.title === "Email" || fields.title === "Reset Password"? (
        <div className="buttons">
          <ActionButton
            type={"submit"}
            name={isSignUp ? (currentStep < Object.keys(steps).length ? "Siguiente" : "Enviar") : fields.title === "Email" || fields.title === "Reset Password" ? "Confirmar" : "Iniciar sesión"}
            classList="mt-3 form-button"
            disabled={!formik.isValid}
          />
        </div>
      ) : (
        <div className="buttons">
          <ActionButton 
            name={"Cancelar"}
            type={"button"}
            onClick={toggleModal}
            classList="mt-3 form-button"
          />
          <ActionButton
            type={"submit"}
            name={"Confirmar"}
            classList="mt-3 form-button"
            disabled={!formik.isValid}
          />
        </div>
      )}
    </form>
  );
};

export default Form;
