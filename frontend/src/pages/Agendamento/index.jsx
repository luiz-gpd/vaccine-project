import React from 'react'
import Page from '../../components/Page'
import { Formik, ErrorMessage } from 'formik'
import schema from '../../utils/schema'
import ClayForm, { ClayInput } from '@clayui/form'
import ClayButton from '@clayui/button'

const Agendamento = () => {

    const onSubmit = () => {
        console.log("Beleuza?!")
    }

    return (
        <Page title="Realize seu Agendamento">
            <Formik
                validationSchema={schema}
                onSubmit={onSubmit}
                initialValues = {{
                    name:'',
                    email:'',
            }}
            render={({ values, handleChange, handleSubmit }) => (
            <ClayForm className="mt-6" onSubmit={handleSubmit}>
                <ClayForm.Group>
                    <b>Nome</b>
                    <ClayInput name="name" value={values.name} onChange={handleChange} type="text"/>
                    <ErrorMessage name="name"/>
                </ClayForm.Group>
                <ClayForm.Group>
                    <b>Email</b>
                    <ClayInput name="email" value={values.email} onChange={handleChange} type="email"/>
                    <ErrorMessage name="email"/>
                </ClayForm.Group>
                <ClayButton type="submit">Enviar</ClayButton>
            </ClayForm>    
            )}
            />
        </Page>
    )
}

export default Agendamento;
