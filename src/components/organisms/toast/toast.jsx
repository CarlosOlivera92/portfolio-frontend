import React, { useState, useEffect } from 'react';
import TextContent from '../../atoms/text-content/text-content';
import './styles.css';

const Toast = ({ text, error, showToasty, onToastClose }) => {
    const toastyClass = error ? 'toastyError' : !error ? 'toastySuccess' : '';
    const [visible, setVisible] = useState(showToasty);
    const toastyVisible = visible ? "visible" : "hidden ";
    const handleCloseToast = () => {
        setVisible(false);
        onToastClose(false);
    };

    useEffect(() => {
        if (showToasty) {
            // Muestra el Toast si showToasty es verdadero
            setVisible(true);
            const timer = setTimeout(() => {
                handleCloseToast();
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [showToasty]);


    return (
        <div className={`toasty ${toastyClass} ${toastyVisible}`} onClick={handleCloseToast}>
            <TextContent text={text} />
        </div>
    );
};

export default Toast;
