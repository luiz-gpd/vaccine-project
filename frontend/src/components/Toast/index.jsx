import React from 'react'
import ClayAlert from '@clayui/alert'

const Toast = ({children, title, type, toast, onClose}) => {
    
    return (
        
        <ClayAlert.ToastContainer>
            {toast.map((value ,index) => (
                <ClayAlert
                    autoClose={5000}
                    key={index}
                    onClose={onClose}
                    role="alert"
                    displayType={type}
                    title={title}
                >{children}</ClayAlert>
            ))}
        </ClayAlert.ToastContainer>


    )
}
export default Toast