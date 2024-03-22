import React from 'react';
import styles from './ModalFooter.module.css';
import ActionButton from '../../atoms/action-button/action-button';

const ModalFooter = ({ children, closeModal, redirect }) => {
    // Verificar si hay elementos hijos proporcionados
    const hasChildren = React.Children.count(children) > 0;

    return (
        <div className={styles.modalFooter}>
            {/* Si hay elementos hijos, renderizarlos */}
            {hasChildren ? (
                children
            ) : (
                // Si no hay elementos hijos, renderizar los botones predeterminados
                redirect ? (
                    <ActionButton
                        name={"Iniciar Sesión"}
                        onClick={() => closeModal()}
                        type={"button"}
                        classname={styles.modalBtn}
                        disabled={false}
                        href={"/signin"}
                    />
                ) : (
                    <ActionButton
                        name={"Cerrar Modal"}
                        onClick={() => closeModal()}
                        type={"button"}
                        classname={styles.modalBtn}
                        disabled={false}
                    />
                )
            )}
        </div>
    );
};

export default ModalFooter;
