import React from 'react'
import { ClaySelect } from '@clayui/form'

const AgendamentoSelect = () => {

    const options = [
        {   label: "8:00", value: "1" },
        {   label: "8:30", value: "2" },
        {   label: "9:00", value: "3" },
        {   label: "9:30", value: "4" },
        {   label: "10:00", value: "5" },
        {   label: "10:30", value: "6" },
        {   label: "11:00", value: "7" },
        {   label: "11:30", value: "8" },
        {   label: "12:00", value: "9" },
        {   label: "12:30", value: "10" },
        {   label: "13:00", value: "11" },
        {   label: "13:30", value: "12" },
        {   label: "14:00", value: "13" },
        {   label: "14:30", value: "14" },
        {   label: "15:00", value: "15" },
        {   label: "15:30", value: "16" },
        {   label: "16:00", value: "17" },
        {   label: "16:30", value: "18" },
        {   label: "17:00", value: "19" },
        {   label: "17:30", value: "20" },
    ];

    return (
        <ClaySelect aria-label="Select Label" id="mySelectId">

            {options.map(option => (
                <ClaySelect.Option
                    key={option.value}
                    label={option.label}
                    value={option.value}
                />
            ))}

        </ClaySelect>
    )
}
export default AgendamentoSelect