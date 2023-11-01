import TitleAtom from "../../atoms/title-atom/title-atom";

const ModalHeader = ({title}) => {
    return (
        <div className="modal-header">
            <TitleAtom title={title}/>
        </div>    
    )
}
export default ModalHeader;