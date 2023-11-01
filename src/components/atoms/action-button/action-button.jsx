/* eslint-disable react/prop-types */
const ActionButton = ( {name, onClick, type, classname, disabled} ) => {
    return <button className={`button ${classname}`} onClick={onClick} type={type} disabled={disabled}> {name} </button>;
};
export default ActionButton;