import React from 'react'
import ClayButton from '@clayui/button'
import Page from '../../components/Page'
import { useHistory } from 'react-router'

const Home = () => {
    const history = useHistory;
    
    return (
        <div>
        <Page>
            <h1 className="welcome">Bem Vindo!</h1>
            <h2 className="mt-4">Devemos nos cuidar sempre!</h2>
            <h2>Tomar a vacina é um cuidado e dever de todos!</h2>
            <ClayButton className="mt-4" onClick={() => {history.push('/user')}}>Agendar Vacina!</ClayButton>
        </Page>
        </div>
    )
}

export default Home;