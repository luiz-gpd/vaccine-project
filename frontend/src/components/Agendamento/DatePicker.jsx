import React from 'react'
import ClayDatePicker from '@clayui/date-picker'
import { Field, ErrorMessage } from 'formik'

const DatePicker = (props) => {
    const { b, name, ...otherProps } = props
    return (
        <div>
            <b>{b}</b>
            <Field name={name}>
                {({ form, field }) => {
                    const { setFieldValue } = form
                    const { value } = field
                    return (
                        <ClayDatePicker
                            name={name}
                            dateFormat='dd/MM/yyyy'
                            value={value}
                            onValueChange={val => setFieldValue(name, val)}
                            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                            months={['Janeiro', 'Feveiro', 'Março',
                                'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
                                'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
                            {...otherProps}
                        />
                    )
                }}
            </Field>
            <ErrorMessage name={name} />
        </div>
    )
}
export default DatePicker
