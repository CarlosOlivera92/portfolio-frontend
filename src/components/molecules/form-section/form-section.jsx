/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import FormItem from "../form-item/form-item"; // Asegúrate de importar FormItem desde la ubicación correcta

const FormSection = ({ title, fields, values, errors, handleChange }) => {
  let numberOfColumns = fields.length > 1 ? 2 : 1; // Determina el número de columnas (1 o 2)

  return (
    <div className="row">
      {fields.map((field, index) => (
        <div className={`form-section col-md-${12 / numberOfColumns} col-12`} key={field.name}>
          <FormItem
            props={field}
            type={field.type}
            name={field.name}
            label={field.label}
            value={values[field.name] || ""}
            onChange={handleChange}
            error={errors[field.name]}
            required={false}
          />
        </div>
      ))}
        {title === "Sign In" && (
            <div className="row">
                <div className={`form-section links d-flex flex-column`}>
                    <NavLink to="/signup">No tienes una cuenta? Regístrate</NavLink>
                    <NavLink to="/forgetpassword">¿Olvidaste tu contraseña?</NavLink>
                </div>
            </div>
        )}
    </div>
  );
};

export default FormSection;
