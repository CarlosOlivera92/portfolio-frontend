/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import FormSection from "../../molecules/form-section/form-section";
import ActionButton from "../../atoms/action-button/action-button";
import { useEffect, useState, useRef } from "react";
import Logo from "../../atoms/logo/logo";

const Form = ({ title, fields, onSubmit, currentStep, steps, isSignUp, isUsernameInUse, isUsernameChecked, message, isUserRegistered, toggleModal }) => {
  const currentFields = isSignUp ? steps[currentStep] : fields.fields.map(field => field.name);
  const [stepTransition, setStepTransition] = useState("form-step-entering");

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
      onSubmit(values, currentStep);
    }
  });

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
        handleChange={formik.handleChange}
        isUsernameInUse={isUsernameInUse}
        isUsernameChecked={isUsernameChecked}
        message={message}
        isUserRegistered={isUserRegistered}
      />
      {fields.title === 'Sign In' || fields.title === 'Sign Up'  || fields.title === "Email" ? (
        <div className="buttons">
          <ActionButton
            type={"submit"}
            name={isSignUp ? (currentStep < Object.keys(steps).length ? "Siguiente" : "Enviar") : fields.title === "Email" ? "Confirmar" : "Iniciar sesión"}
            classname="mt-3 form-button"
            disabled={!formik.isValid}
          />
        </div>
      ) : (
        null
      )}
    </form>
  );
};

export default Form;
