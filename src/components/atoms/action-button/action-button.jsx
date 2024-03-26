import styles from './action-button.module.css';

const ActionButton = ( {name, onClick, type, classList, disabled, href} ) => {
    const handleClick = () => {
        onClick();
    }
    if (onClick) {
        return (
            <>
                {href ? (
                    <a href={href}>
                        <button className={`${styles.button} ${classList}`} onClick={handleClick} type={type} disabled={disabled}>
                            {name} 
                        </button>
                    </a>
                ) : (
                    <button className={`${styles.button} ${classList}`} onClick={handleClick} type={type} disabled={disabled}>
                        {name} 
                    </button>
                )}
            </>
        )
    }
    return(
        <>
            {href ? (
                <a href={href}>
                    <button className={`button ${classList}`} type={type} disabled={disabled}>
                        {name} 
                    </button>
                </a>
            ) : (
                <button className={`button ${classList}`} type={type} disabled={disabled}>
                    {name} 
                </button>
            )}
        </>
    )
};
export default ActionButton;