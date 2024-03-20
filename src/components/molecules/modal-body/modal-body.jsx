import TextContent from "../../atoms/text-content/text-content";

const ModalBody = ({ text, children }) => {
    return (
        <div className="modal-body">
            {text && <TextContent text={text} />}
            {children}
        </div>
    );
};

export default ModalBody;