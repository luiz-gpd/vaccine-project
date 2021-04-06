import * as Yup from 'yup';
const data = new Date();

const day = data.getDate + 1;
const month = data.getMonth + 1;
const year = data.getYear%100;

export default Yup.object().shape({
    name: Yup.string().min(4,'O nome deve ter mais de 4 letras').required('É necessário um nome'),
    // bornDate: Yup.date().max(new Date(), 'Não é possível definir esse data como nascimento').required('É necessário haver uma data'),
    // consultationDate: Yup.date().min(`${year}/${month}/${day}`).required('É necessário haver uma data'),
})