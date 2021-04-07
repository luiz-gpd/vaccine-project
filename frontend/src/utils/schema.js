import * as Yup from 'yup';

export default Yup.object().shape({
    name: Yup.string().min(4,'O nome deve ter mais de 4 letras').required('É necessário um nome'),
    bornDate: Yup.date().max(new Date(), 'Não é possível definir esse data como nascimento').required('É necessário haver uma data'),
    consultationDate: Yup.date().min(new Date(), 'Não é possível marcar sua consulta para esse dia').required('É necessário haver uma data'),
    consultationTime: Yup.string().min(3, 'É necessário haver um horário').required('É necessário haver um horário'),
})