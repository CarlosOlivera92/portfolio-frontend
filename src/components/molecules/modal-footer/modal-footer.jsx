import { useState } from "react";
import ActionButton from "../../atoms/action-button/action-button";

const ModalFooter = ( {closeModal} ) => {

    return (
        <div className="modal-footer">
        <ActionButton
            name={"Cerrar Modal"}
            onClick={ () => closeModal()}
            type={"button"}
            classname={"modalBtn"}
            disabled={false}
        />
        </div>
    )
}
export default ModalFooter;