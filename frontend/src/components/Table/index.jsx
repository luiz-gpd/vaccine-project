import React, { useEffect, useContext } from 'react'
import moment from 'moment'
import api from '../../utils/api'
import { ClayToggle } from '@clayui/form'
import { ClayButtonWithIcon } from '@clayui/button'
import AppContext from '../../AppContext'

const Table = ( { usersPerPage, pageNumber } ) => {

    const [{ search }, dispatch] = useContext(AppContext);
    const [users, setUsers] = React.useState([])

    const getUsers = async () => {
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

    const onClick = (id, info) => {
        dispatch({
            type: "SET_MODAL",
            payload: {
                userId: id,
                info: info,
                visible: true,
            },
          });
    }

    const onToggle = async (id, attended) => {
        const formData = {
            attended: !attended
        }
        await api.put(`/user/${id}`, formData);
        getUsers();
    }

    let pagesVisited = pageNumber * usersPerPage;

    return (
        <table className="content-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Idade</th>
                                <th>Data da Vacina</th>
                                <th>Horário da Vacina</th>
                                <th>Atendimento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length && (
                            // eslint-disable-next-line array-callback-return
                            users.filter((user)=> {
                                    if (search === "") {
                                        return user;
                                    } else if(user.name.toLowerCase().includes(search.toLowerCase())) {
                                        pagesVisited=10;
                                        return user;
                                    }
                                })
                                .sort((
                                    (a, b) =>
                                        (moment(a.consultationDate).isBefore(b.consultationDate)) ? 
                                            moment(a.consultationDate).diff(b.consultationDate) :
                                            (a.consultationDate === b.consultationDate) &&
                                            (moment(moment(a.consultationTime, "HH:mm")).diff(moment(b.consultationTime, "HH:mm")))
                                ))
                                .slice(pagesVisited - usersPerPage, pagesVisited)
                                .map((user, key) => (
                                    <tr key={key}>
                                        <td>{user.name}</td>
                                        <td>{user.age}</td>
                                        <td>{moment(user.consultationDate).format("DD/MM/yyyy")}</td>
                                        <td>{user.consultationTime}</td>
                                        <td><ClayToggle label={user.attended ? "Realizado" : "Não foi realizado"}
                                                disabled={(moment(user.consultationDate).isBefore(new Date())) ? false : true}
                                                toggled={user.attended}
                                                data-testid='table-toggle'
                                                onToggle={() => onToggle(user._id, user.attended)}/>
                                            {user.attended && <ClayButtonWithIcon data-testid="table-button" className="btn btn-primary btn-sm ml-2"
                                                symbol="comments" onClick={() => onClick(user._id, user.consultInfo)} />}</td>
                                    </tr>

                                )))}
                        </tbody>
                    </table>
    )
}

export default Table;