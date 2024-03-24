/* eslint-disable react/prop-types */
const ActionButton = ( {name, onClick, type, classList, disabled, href} ) => {
    const handleClick = () => {
        onClick();
    }
    return(
        <>
            {href ? (
                <a href={href}>
                    <button className={`button ${classList}`} onClick={handleClick} type={type} disabled={disabled}>
                        {name} 
                    </button>
                </a>
            ) : (
                <button className={`button ${classList}`} onClick={handleClick} type={type} disabled={disabled}>
                    {name} 
                </button>
            )}
        </>
    )
};
export default ActionButton;