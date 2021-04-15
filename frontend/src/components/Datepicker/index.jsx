import React from 'react'
import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale }from 'react-datepicker'
import pt from "date-fns/locale/pt";

function DatePicker (props) {
  
  const { b, name, ...rest } = props
  registerLocale("pt", pt)

  return (
    <div className='form-control'>
      <b htmlFor={name}>{b}</b><br/>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form
          const { value } = field
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={val => setFieldValue(name, val)}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              scrollableMonthYearDropdown
              placeholderText="00/00/0000"
              autoComplete="off"
              locale="pt"
            />
          )
        }}
      </Field><br/>
      <ErrorMessage className="error" name={name} />
    </div>
  )
}

export default DatePicker
