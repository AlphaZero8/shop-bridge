import { useState } from "react";
import { Button, Modal } from "semantic-ui-react";

const ConfirmationModal = ({
    trigger,
    header,
}) => {
    const [open, setOpen] = useState(false);
    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={trigger}
        >
            <Modal.Header>{header}</Modal.Header>
            <Modal.Content></Modal.Content>
            <Modal.Actions>
                <Button negative>Confirm</Button>
                <Button>Cancel</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ConfirmationModal;