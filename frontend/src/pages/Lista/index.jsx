import React, {useEffect} from 'react'
import Page from '../../components/Page'

const Lista = () => {

    const fetchData = async () => {
    
    }
    
    useEffect(() => {
        fetchData();
      }, [])

    return (
        <Page title="Lista de Agendamentos">
            Lista
        </Page>
    )
}

export default Lista;
