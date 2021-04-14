import React from 'react'
import ClayButton from '@clayui/button'
import Page from '../../components/Page'

const Home = ( {history} ) => {
    
    return (
        <div className="background-img">
        <Page>
            <h1 className="welcome">Bem Vindo!</h1>
            <h2 className="mt-4">Devemos nos cuidar sempre!</h2>
            <h2>Tomar a vacina é um cuidado e dever de todos!</h2>
            <ClayButton className="mt-4" onClick={() => {history.push('/user')}}>Agendar Vacinação!</ClayButton>
        </Page>
        </div>
    )
}

export default Home;