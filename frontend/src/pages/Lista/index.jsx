import React, { useEffect, useState } from 'react'
import Page from '../../components/Page'
import api from '../../utils/api'
import ClayTable from '@clayui/table'
import ClayLoadingIndicator from '@clayui/loading-indicator'
import { ClayToggle } from '@clayui/form'
import { useModal } from '@clayui/modal'
import { ClayButtonWithIcon } from '@clayui/button'
import Modal from '../../components/Modal'
import moment from 'moment'

const Lista = () => {

    const initialState = {
        name:"",
        consultationDate:"",
        consultationTime:"",
        consultInfo:"",
    }

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);  
    const [form, setForm] = useState(initialState);
    const { observer, onClose } = useModal({
        onClose: () => setVisible(false),
    });

    const getUsers = () => {
        setLoading(true);
        api.get('/user').then((response) => {
            const { data } = response;
            setUsers(data);
        }).catch((e) => {
            console.log(e);
        });
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, [])

    const onToggle = async (name, date, time) => {
        await api.put(`/user/${name}/${date}/${time}`);
        getUsers();
    }

    const getModalInfo = ( name, date, time, info ) => {
        setVisible(true);
        setForm({
            name:name,
            consultationDate:date,
            consultationTime:time,
            consultInfo:info
        })
    }

    return (
        <Page title="Lista de Agendamentos">
            {loading ? (
                <ClayLoadingIndicator />
            ) : (
                <>
                    <ClayTable>
                        <ClayTable.Head>
                            <ClayTable.Row>
                                <ClayTable.Cell headingCell>Nome</ClayTable.Cell>
                                <ClayTable.Cell headingCell>Idade</ClayTable.Cell>
                                <ClayTable.Cell headingCell>Data da Vacina</ClayTable.Cell>
                                <ClayTable.Cell headingCell>Horário da Vacina</ClayTable.Cell>
                                <ClayTable.Cell headingCell>Atendimento</ClayTable.Cell>
                            </ClayTable.Row>
                        </ClayTable.Head>
                        <ClayTable.Body>
                            {users.map((user, index) => (
                                <ClayTable.Row key={index}>
                                    <ClayTable.Cell>{user.name}</ClayTable.Cell>
                                    <ClayTable.Cell>{user.age}</ClayTable.Cell>
                                    <ClayTable.Cell>{moment(user.consultationDate).format("DD/MM/yyyy")}</ClayTable.Cell>
                                    <ClayTable.Cell>{user.consultationTime}</ClayTable.Cell>
                                    <ClayTable.Cell>
                                        <ClayToggle label={user.attended ? "Realizado" : "Não foi realizado"}
                                            // disabled={(user.consultationDate > new Date()) ? "" : "anything"}
                                            toggled={user.attended}
                                            onToggle={() => onToggle(user.name, user.consultationDate, user.consultationTime)} />
                                        {user.attended && <ClayButtonWithIcon className="btn btn-primary btn-sm ml-2"
                                        symbol="comments" onClick={() => getModalInfo(user.name, user.consultationDate, user.consultationTime, user.consultInfo)}/>}
                                    </ClayTable.Cell>
                                </ClayTable.Row>

                            ))}
                        </ClayTable.Body>
                    </ClayTable>
                    <Modal
                        visible={visible}
                        onClose={onClose}
                        observer={observer}
                        title="Dados da consulta"
                        name={form.name}
                        date={form.consultationDate}
                        time={form.consultationTime}
                        >{form.consultInfo}
            </Modal>
                </>)}
        </Page>
    )
}

export default Lista;
