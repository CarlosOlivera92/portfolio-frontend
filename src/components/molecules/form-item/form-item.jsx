import InputItem from "../../atoms/input-item/input-item";

const FormItem = ({ props, type, name, label, required, value, onChange, error }) => {
  const isValid = !error && value !== "";
  return (
    <div className={`form-item ${type === "textarea" ? "col-12" : "col-md-6"}`}>
      {type === "checkbox" ? (
        <>
          <label htmlFor={name} className="btn-icon" >
            <span className="icon-wrapper"></span>
            {props.name}
          </label>
          <InputItem id={name} props={props} type={type} name={name} value={value} onChange={onChange} required={false}/>

        </>
      ) : (
        <div className="form-item d-flex flex-column">
          <label htmlFor={name}>{label}</label>
          <InputItem id={name} type={type} name={name} value={value} onChange={onChange} required={required}/>
          {!isValid && <div className="error">{error}</div>}
        </div>
      )}

    </div>
  );
};

export default FormItem;
