import React, { useEffect, useState, useContext } from 'react'
import Page from '../../components/Page'
import api from '../../utils/api'
import { ClayPaginationWithBasicItems } from '@clayui/pagination';
import { ClayInput } from '@clayui/form'
import { useModal } from '@clayui/modal'
import Modal from '../../components/Modal'
import Table from '../../components/Table'
import AppContext from '../../AppContext'


const Lista = () => {

    const [{ search, modalInfo }, dispatch] = useContext(AppContext);
     
    const [users, setUsers] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const { observer, onClose } = useModal({
        onClose: () => dispatch({
            type: "SET_MODAL",
            payload: { ...modalInfo, visible: false},
          }),
    });

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

    // const getModalInfo = (id, info) => {
    //     setVisible(true);
    //     setForm({
    //         _id: id,
    //         consultInfo: info
    //     })
    // }

    const usersPerPage = 10;
    const pagesTotal = Math.ceil(users.length / usersPerPage)

    return (
        <Page title="Lista de Agendamentos">
                <>
                    <ClayInput className="mt-4"
                        value={search}
                        name="search"
                        type="text"
                        placeholder="Pesquisar..."
                        onChange={(event) => {
                            dispatch({
                                type: "USE_SEARCH",
                                payload: event.target.value,
                              });
                        }}
                    />
                    {pagesTotal && <ClayPaginationWithBasicItems
                        className="mt-2"
                        activePage={pageNumber}
                        ellipsisBuffer={2}
                        onPageChange={setPageNumber}
                        totalPages={pagesTotal}
                    />}
                    <Table usersPerPage={usersPerPage} pageNumber={pageNumber} />
                    <Modal
                        visible={modalInfo.visible}
                        onClose={onClose}
                        observer={observer}
                        title="Dados da consulta"
                        id={modalInfo.userId}
                    >
                        {modalInfo.info}
                    </Modal>
                </>
        </Page>
    )
}

export default Lista;
