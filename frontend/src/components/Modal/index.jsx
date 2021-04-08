import React, { useState } from 'react'
import ClayButton from '@clayui/button'
import ClayModal from '@clayui/modal'
import { ClayInput } from '@clayui/form'
import api from '../../utils/api'

const Modal = ({
    visible,
    onClose,
    observer,
    title,
    name,
    date,
    time,
    children
}) => {

    const initialState = {
        information:""
    }
    const [state, setState] = useState(false)
    const [form, setForm] = useState(initialState)
    
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
        await api.post(`/user/${name}/${date}/${time}`, formData);
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
                                <ClayButton displayType="secondary" onClick={setState}>Alterar</ClayButton>
                                {state && (<><ClayInput name="information" className="mt-4 mb-2" value={form.information} onChange={onChange}/>
                                <ClayButton displayType="primary" onClick={onClick}>Salvar</ClayButton></>)}
                        </>}
                        last={<ClayButton className="btn btn-danger" onClick={onClose}>Fechar</ClayButton>}
                    />
                </ClayModal>
            )}
        </>
    );
}

export default Modal;
