import React, { useEffect, useState } from 'react'
import Page from '../../components/Page'
import api from '../../utils/api'
import ClayTable from '@clayui/table'
import ClayButton from '@clayui/button'

const Lista = () => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        api.get('/user').then((response) => {
            const { data } = response;
            setUsers(data);
        }).catch((e) => {
            console.log(e);
        });
    };

    useEffect(() => {
        getUsers();
    }, [])

    const onClick = async (name, date, time) => {
        await api.put(`/user/${name}/${date}/${time}`);
        getUsers();
    }

    return (
        <Page title="Lista de Agendamentos">
            {/* {users.map((user, index) => (*/}
            <ClayTable>
                <ClayTable.Head>
                    <ClayTable.Row>
                        <ClayTable.Cell headingCell>Nome</ClayTable.Cell>
                        <ClayTable.Cell headingCell>Idade</ClayTable.Cell>
                        <ClayTable.Cell headingCell>Data da Vacina</ClayTable.Cell>
                        <ClayTable.Cell headingCell>Horário da Vacina</ClayTable.Cell>
                        <ClayTable.Cell headingCell>Horário da Vacina</ClayTable.Cell>
                    </ClayTable.Row>
                </ClayTable.Head>
                <ClayTable.Body>
                    {users.map((user, index) => (
                        <ClayTable.Row key={index}>
                            <ClayTable.Cell>{user.name}</ClayTable.Cell>
                            <ClayTable.Cell>{user.age}</ClayTable.Cell>
                            <ClayTable.Cell>{user.consultationDate}</ClayTable.Cell>
                            <ClayTable.Cell>{user.consultationTime}</ClayTable.Cell>
                            <ClayTable.Cell>
                                <ClayButton label="Atendido"
                                disabled={(user.consultationDate > new Date()) ? "" : "anything"}
                                className={user.attended ? "btn btn-success btn-sm" : "btn btn-danger btn-sm"}
                                onClick={() => onClick(user.name, user.consultationDate, user.consultationTime)}>
                                    {user.attended ? "Atendido" : "Não foi atendido"}</ClayButton>
                            </ClayTable.Cell>
                        </ClayTable.Row>
                    ))}
                </ClayTable.Body>
            </ClayTable>

        </Page>
    )
}

export default Lista;
