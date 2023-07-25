import { useState } from "react";

const useCustomForm = (initialValues = {}, onSubmit) => {

    const [formData, setFormData] = useState(initialValues)

    const handleInputChange = (e) => {
        e.persist()
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const reset = () => setFormData(initialValues)

    return [formData, handleInputChange, handleSubmit, reset]
}

export default useCustomForm;