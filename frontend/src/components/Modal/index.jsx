import React from 'react'
import ClayButton from '@clayui/button'
import ClayModal from '@clayui/modal'
import { ClayInput } from '@clayui/form'
import api from '../../utils/api'

const Modal = ({
    visible,
    onClose,
    observer,
    title,
    id,
    children
}) => {

    const initialState = {
        information:""
    }
    const [showChanger, setShowChanger] = React.useState(false)
    const [form, setForm] = React.useState(initialState)
    
    const onChange = ({ target: { name, value } }) => {
        setForm({
          ...form,
          [name]: value,
        });
      };

    const onClick = async () => {
        const formData = {
            consultInfo:form.information
        }
        await api.put(`/user/${id}`, formData);
        document.location.reload();
    }

    return (
        <>
            {visible && (
                <ClayModal
                    observer={observer}
                    size="lg"
                    status="info"
                >
                    <ClayModal.Header>{title}</ClayModal.Header>
                    <ClayModal.Body>
                        {children}
                    </ClayModal.Body>
                    <ClayModal.Footer
                        first={<>
                                <ClayButton displayType="secondary" onClick={setShowChanger}>Alterar</ClayButton>
                                {showChanger && (<><ClayInput data-testid='formField' name="information" className="mt-4 mb-2 formfield" value={form.information} onChange={onChange}/>
                                <ClayButton displayType="primary" onClick={onClick}>Salvar</ClayButton></>)}
                        </>}
                        last={<ClayButton data-testid='closeButtonSave' className="btn btn-danger" onClick={onClose}>Fechar</ClayButton>}
                    />
                </ClayModal>
            )}
        </>
    );
}

export default Modal;
