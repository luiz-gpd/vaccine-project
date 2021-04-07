import React from 'react'
import Page from '../../components/Page'
import { Formik, ErrorMessage, Form } from 'formik'
import schema from '../../utils/schema'
import ClayForm, { ClayInput, ClaySelectWithOption } from '@clayui/form'
import ClayButton from '@clayui/button'
import options from '../../components/Agendamento/options'
import DatePicker from '../../components/Agendamento/DatePicker'
import api from '../../utils/api'

const Agendamento = () => {

    const onSubmit = async (values) => {

        const bornOn = values.bornDate;
        const d = new Date();
        
        var idade = d.getFullYear() - bornOn.getFullYear();
        
        if (d.getMonth() + 1 < bornOn.getMonth() + 1 || (d.getMonth() + 1 === bornOn.getMonth() + 1 && d.getDate() < bornOn.getDate())) {
            idade--;
        }
        const user = {
            name:values.name,
            age:idade,
            consultationDate:values.consultationDate,
            consultationTime:values.consultationTime,
        };

        try {
            const response = await api.post('/user', user)
            if (response.data === "Já há duas pessoas nesse horário") {
                alert(response.data);
            } else {
            alert("Cadastro Realizado");
        }
        } catch (e) {
            alert(e.response.data.message);
        }
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
                    consultationTime: '',
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
                            <ClaySelectWithOption
                                name="consultationTime" 
                                onChange={handleChange}
                                options={options}
                            >   
                            </ClaySelectWithOption>
                            <ErrorMessage name="consultationTime" />
                        </ClayForm.Group>
                        <ClayButton type="submit">Enviar</ClayButton>
                    </Form>
                )}
            </Formik>
        </Page>
    )
}

export default Agendamento;