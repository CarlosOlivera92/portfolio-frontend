import InputItem from "../../atoms/input-item/input-item";

const FormItem = ({ props, type, name, label, required, value, onChange, error }) => {
  const isValid = !error && value !== "";

  return (
    <div className="form-item">
      {type === "checkbox" ? (
        <>
          <InputItem id={props.id} props={props} type={type} name={name} value={value} onChange={onChange} required={false}/>
          <label className="btn-icon">
            <span className="icon-wrapper"></span>
            {props.name}
          </label>
        </>
      ) : (
        <div className="form-item d-flex flex-column">
          <label htmlFor={name}>{label}</label>
          <InputItem {...props} type={type} name={name} value={value} onChange={onChange} required={false}/>
          {isValid && <div className="valid">Correcto</div>}
          {error && <div className="error">{error}</div>}
        </div>
      )}

    </div>
  );
};

export default FormItem;
