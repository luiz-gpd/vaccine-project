import React from 'react'
import ClayLayout from '@clayui/layout'
import VaciCuidar_logo from '../../utils/images/VaciCuidar_logo.png'

const Page = ({ title, children }) => {
    return (
        <ClayLayout.Container className="mt-4">
            <ClayLayout.Row justify="between">
                <ClayLayout.Col>
                <h1>{title}</h1>
                </ClayLayout.Col>
                <ClayLayout.Col size={3}>
                    <img src={VaciCuidar_logo} width="250px" alt="Logo do site" />
                </ClayLayout.Col>
            </ClayLayout.Row>
            { children}
        </ClayLayout.Container>
    )
}

export default Page;
