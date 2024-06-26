/* eslint-disable react/prop-types */
const InputItem = ({ type, id, name, value, props, required, onChange}) => {
  if (type === "checkbox") {
    return <input type={type} id={props.id} name={name} value={props.id} />;
  } else if (type === "textarea") {
    return <textarea type={type} id={id} name={name} value={value} required={required} onChange={(e) => { onChange(e) }} />;
  } else {
    return <input type={type} id={id} name={name} value={value} required={required} onChange={(e) => { onChange(e) }} />;
  }
};

export default InputItem;
