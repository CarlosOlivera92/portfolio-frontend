import { NavLink } from "react-router-dom";
import FormItem from "../form-item/form-item";

const FormSection = ({ title, fields, values, errors, handleChange, isUsernameInUse, isUsernameChecked, message, isUserRegistered }) => {
  let numberOfColumns = fields.length > 1 ? 2 : 1; // Determina el número de columnas (1 o 2)
  return (
    <div className="row">
      {fields.map((field, index) => (
        <div className={`form-section ${field.type === 'textarea' ? 'col-12' : `col-md-${12 / numberOfColumns}`} col-12`} key={field.name}>
          {field.type !== 'file' ? (
            <FormItem
              type={field.type}
              name={field.name}
              label={field.label}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              error={errors[field.name]}
              required={false}
            />
          ) : (
            <input
              type="file"
              name={field.name}
              onChange={(e) => handleChange(field.name, e.target.files[0])} // Manejar el evento de cambio para campos de tipo "file"
              accept={field.accept} // Opcional: especifica el tipo de archivos permitidos
            />
          )}
          {
            (field.name === "username" || title === "Email") && (
              <div className={`availability-message ${ isUsernameInUse || isUserRegistered ?  "success" : "error"}`}>
                {isUsernameInUse || !isUserRegistered ? (
                  <p>{message}</p>
                ) : (
                  <p>{message}</p>
                )}
              </div>
            )
          }
        </div>
      ))}
      {title === "Sign In" && (
        <div className="row">
          <div className={`form-section links d-flex flex-column`}>
            <NavLink to="/signup">No tienes una cuenta? Regístrate</NavLink>
            <NavLink to="/forgotpassword">¿Olvidaste tu contraseña?</NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSection;
