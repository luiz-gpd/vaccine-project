import React, { useEffect, useState } from 'react'
import Page from '../../components/Page'
import api from '../../utils/api'
import ClayTable from '@clayui/table'
import ClayLoadingIndicator from '@clayui/loading-indicator'
import { ClayPaginationWithBasicItems } from '@clayui/pagination';
import { ClayToggle, ClayInput } from '@clayui/form'
import { useModal } from '@clayui/modal'
import { ClayButtonWithIcon } from '@clayui/button'
import Modal from '../../components/Modal'
import moment from 'moment'

const Lista = () => {

    const initialState = {
        name: "",
        consultationDate: "",
        consultationTime: "",
        consultInfo: "",
    }

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
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

    const onToggle = async (id, attended) => {
        const formData = {
            attended: !attended
        }
        await api.put(`/user/${id}`, formData);
        getUsers();
    }

    const getModalInfo = (id, info) => {
        setVisible(true);
        setForm({
            _id: id,
            consultInfo: info
        })
    }

    const [pageNumber, setPageNumber] = useState(1)
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const pagesTotal = Math.ceil(users.length / usersPerPage)

    return (
        <Page title="Lista de Agendamentos">
            {loading ? (
                <ClayLoadingIndicator />
            ) : (
                <>
                    <ClayInput className="mt-4"
                        value={search}
                        name="search"
                        type="text"
                        placeholder="Pesquisar..."
                        onChange={(event) => {setSearch(event.target.value)}}
                    />
                    {pagesTotal && <ClayPaginationWithBasicItems
                        className="mt-2"
                        activePage={pageNumber}
                        ellipsisBuffer={2}
                        onPageChange={setPageNumber}
                        totalPages={pagesTotal}
                    />}
                    <ClayTable className="mt-2">
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
                            {// eslint-disable-next-line array-callback-return
                            users.filter((user)=> {
                                    if (search === "") {
                                        return user;
                                    } else if(user.name.toLowerCase().includes(search.toLowerCase())) {
                                        return user;
                                    }
                                })
                                .sort((
                                    (a, b) =>
                                        (moment(a.consultationDate).isBefore(b.consultationDate)) ?
                                            moment(a.consultationDate).diff(b.consultationDate) :
                                            (a.consultationDate === b.consultationDate) &&
                                            (a.consultationTime - b.consultationTime)
                                ))
                                .slice(pagesVisited - usersPerPage, pagesVisited)
                                .map((user, key) => (
                                    <ClayTable.Row key={key}>
                                        <ClayTable.Cell>{user.name}</ClayTable.Cell>
                                        <ClayTable.Cell>{user.age}</ClayTable.Cell>
                                        <ClayTable.Cell>{moment(user.consultationDate).format("DD/MM/yyyy")}</ClayTable.Cell>
                                        <ClayTable.Cell>{user.consultationTime}:00</ClayTable.Cell>
                                        <ClayTable.Cell>
                                            <ClayToggle label={user.attended ? "Realizado" : "Não foi realizado"}
                                                disabled={(moment(user.consultationDate).isBefore(new Date())) ? false : true}
                                                toggled={user.attended}
                                                onToggle={() => onToggle(user._id, user.attended)} />
                                            {user.attended && <ClayButtonWithIcon className="btn btn-primary btn-sm ml-2"
                                                symbol="comments" onClick={() => getModalInfo(user._id, user.consultInfo)} />}
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
                        id={form._id}
                    >{form.consultInfo}
                    </Modal>
                </>)}
        </Page>
    )
}

export default Lista;
