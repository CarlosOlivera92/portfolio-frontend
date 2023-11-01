import TextContent from "../../atoms/text-content/text-content";

const ModalBody = ({text}) => {
    return(
        <div className="modal-body">
            <TextContent text={text} />
        </div>
    )
}
export default ModalBody;