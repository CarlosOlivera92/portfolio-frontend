/* eslint-disable react/prop-types */
const ActionButton = ( {name, onClick, type, classname, disabled, href} ) => {
    return(
        <>
            {href ? (
                <a href={href}>
                    <button className={`button ${classname}`} onClick={onClick} type={type} disabled={disabled}>
                        {name} 
                    </button>
                </a>
            ) : (
                <button className={`button ${classname}`} onClick={onClick} type={type} disabled={disabled}>
                    {name} 
                </button>
            )}
        </>
    )
};
export default ActionButton;