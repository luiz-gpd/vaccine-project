import React, { useState } from 'react'
import Page from '../../components/Page'
import { Formik, ErrorMessage, Form } from 'formik'
import schema from '../../utils/schema'
import ClayForm, { ClayInput } from '@clayui/form'
import ClayButton from '@clayui/button'
import ClayDatePicker from '@clayui/date-picker'
import AgendamentoSelect from '../../components/Agendamento/AgendamentoSelect'
import DatePicker from '../../components/Agendamento/DatePicker'

const Agendamento = () => {
    // const [state, setstate] = useState(null)

    const day = new Date();

    const onSubmit = () => {
        console.log(day.getDate());
        console.log(day.getMonth() + 1);
        console.log(day.getYear() % 100);
    }

    return (
        <Page title="Realize seu Agendamento">
            <Formik
                validationSchema={schema}
                onSubmit={onSubmit}
                initialValues={{
                    name: '',
                    bornDate: '',
                    consultationDate: '',
                }}>
                {({ values, handleChange, handleSubmit }) => (
                    <Form className="mt-6" onSubmit={handleSubmit}>
                        <ClayForm.Group>
                            <b>Nome:</b>
                            <ClayInput name="name" type="text" value={values.name} placeholder="Fulano de Tal" onChange={handleChange} />
                            <ErrorMessage name="name" />
                        </ClayForm.Group>
                        <ClayForm.Group>
                            <DatePicker
                                b='Data de Nascimento:'
                                name='bornDate'
                                placeholder='01/01/2000'
                                years={{
                                    end: 2021,
                                    start: 1905
                                }}
                            />
                        </ClayForm.Group>
                        <ClayForm.Group>
                            <DatePicker
                                b='Data da consulta'
                                placeholder="01/01/2021"
                                name="consultationDate"
                                years={{
                                    end: 2021,
                                    start: 2021
                                }}
                            />
                        </ClayForm.Group>
                        <ClayForm.Group>
                            <b>Horário da Consulta:</b>
                            <AgendamentoSelect />
                        </ClayForm.Group>
                        <ClayButton type="submit">Enviar</ClayButton>
                    </Form>
                )}
            </Formik>
        </Page>
    )
}

export default Agendamento;