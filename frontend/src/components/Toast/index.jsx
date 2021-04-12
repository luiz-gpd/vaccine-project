import React, { useContext } from 'react'
import AppContext from '../../AppContext'
import ClayAlert from '@clayui/alert'

const Toast = (children, title, type) => {
    
    const {toast, setToast} = useContext(AppContext);
    
    //  {setToastItems([...toastItems, Math.random() * 100])}
    return (
        <ClayAlert.ToastContainer>
            {toast.map(value => (
                <ClayAlert
                    autoClose={5000}
                    key={value}
                    onClose={() => {
                        setToast(prevItems =>
                            prevItems.filter(item => item !== value)
                        );
                    }}
                    className={type}
                    title={title}
                >{children}</ClayAlert>
            ))}
        </ClayAlert.ToastContainer>


    )
}
export default Toast