import React from 'react'
import Page from '../../components/Page'
import { Formik, ErrorMessage, Form } from 'formik'
import schema from '../../utils/schema'
import ClayForm, { ClayInput } from '@clayui/form'
import ClayButton from '@clayui/button'
import ClayDatePicker from '@clayui/date-picker'
import AgendamentoSelect from '../../components/Agendamento/AgendamentoSelect'

const Agendamento = () => {

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
                            <b>Data de nascimento:</b>
                            <ClayDatePicker
                                placeholder="01/01/2000"
                                name="bornDate"
                                value={values.bornDate}
                                onChange={handleChange}
                                years={{
                                    end: 2021,
                                    start: 1990
                                }}
                                weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                            />
                            <ErrorMessage name="bornDate" />
                        </ClayForm.Group>
                        <ClayForm.Group>
                            <b>Data da consulta:</b>
                            <ClayDatePicker
                                placeholder="01/01/2021 "
                                name="consultationDate"
                                value={values.consultationDate}
                                onChange={handleChange}
                                years={{
                                    end: 2021,
                                    start: 2021
                                }}
                                months={[
                                    'April', 'May', 'June', 'July', 'August',
                                    'September', 'October', 'November', 'December']}

                                weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                            />
                            <ErrorMessage name="consultationDate" />
                        </ClayForm.Group>
                        <ClayForm.Group>
                            <b>Data da consulta:</b>
                            <AgendamentoSelect/>
                        </ClayForm.Group>
                        <ClayButton type="submit">Enviar</ClayButton>
                    </Form>
                )}
            </Formik>
        </Page>
    )
}

export default Agendamento;