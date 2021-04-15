import React, { useContext, useState, useEffect } from 'react'
import { Prompt } from 'react-router'
import Page from '../../components/Page'
import { Formik, ErrorMessage, Form } from 'formik'
import schema from '../../utils/schema'
import ClayForm, { ClayInput, ClaySelectWithOption } from '@clayui/form'
import ClayButton from '@clayui/button'
import options from '../../components/Agendamento/options'
import AppContext from '../../AppContext'
import DatePicker from '../../components/Datepicker'
import api from '../../utils/api'
import Toast from '../../components/Toast'


const Agendamento = () => {
    const [{ toast }, dispatch] = useContext(AppContext);
    const [toastType, setToastType] = useState(true);

    useEffect(() => {
        window.onbeforeunload = function () {
          return true;
        };
        return () => {
          window.onbeforeunload = null;
        };
      }, []);

    const onSubmit = async (values) => {

        const bornOn = values.birthDate;
        const d = new Date();
        var idade = d.getFullYear() - bornOn.getYear() - 1900;
        if (d.getMonth() + 1 < bornOn.getMonth() + 1 || (d.getMonth() + 1 === bornOn.getMonth() + 1 && d.getDate() < bornOn.getDate())) {
            idade--;
        }

        const user = {
            name: values.name,
            age: idade,
            consultationDate: values.consultationDate,
            consultationTime: values.consultationTime,
            attended: false,
            consultInfo: ""
        };

        try {
            const response = await api.post('/user', user)
            const value = Math.random() * 100
            if (response.data === "Já há duas pessoas nesse horário") {
                setToastType(false);
                dispatch({
                    type: "SHOW_TOAST",
                    payload: { value },
                  });
                } else {
                    setToastType(true);
                    dispatch({
                        type: "SHOW_TOAST",
                        payload: { value },
                      }); 
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
                    birthDate: '',
                    consultationDate: '',
                    consultationTime: '',
                }}>
                {({ values, handleChange, handleSubmit, dirty }) => (
                    <Form className="mt-6" onSubmit={handleSubmit}>
                        <Prompt 
                        when={dirty}
                        message="Você tem alterações não salvas, deseja mesmo mesmo sair?"/>
                        <ClayForm.Group>
                            <b>Nome:</b>
                            <ClayInput name="name" type="text" value={values.name} placeholder="Exemplo exemplo" onChange={handleChange} />
                            <ErrorMessage name="name" />
                        </ClayForm.Group>
                        <div className="form-group-autofit"><div className="mr-6">
                            <ClayForm.Group>
                                <DatePicker
                                    b="Data de Nascimento: "
                                    name="birthDate"
                                    maxDate={new Date()}
                                />
                            </ClayForm.Group></div>
                            <div className="ml-6">
                                <ClayForm.Group>
                                    <DatePicker
                                        b="Data da consulta: "
                                        name="consultationDate"
                                        minDate={new Date()}
                                    />
                                </ClayForm.Group></div></div>
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
            <Toast title={toastType ? "Pronto!" : "Erro"}
            onClose={() => {
                dispatch({
                    type: "HIDE_TOAST",
                    payload: { data: "" },
                });
            }}
            toast={toast}
            type={toastType ? "success" : "danger"}
            >{toastType ? "Cadastro realizado com successo!" : "Já há duas pessoas nesse horário!"}</Toast>
        </Page> 
    )
}

export default Agendamento;