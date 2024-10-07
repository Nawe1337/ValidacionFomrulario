import { useEffect, useMemo, useState } from "react"


export const useForm = ( initialForm = {},formValidation={}) => {
  
  const [formState, setFormState] = useState(initialForm)
  const [formValidationState, setFormValidationState] = useState({});

  useEffect(() => {
    createValidators()
  },[formState]);

  
  const isFormValid = useMemo( () => {

for (const formValue of Object.keys(formValidationState)) {
  if (formValidationState[formValue] !== null ) return false;

}

return true;
},[formValidationState] );

  const handleChange = ({ target }) => {
const { name, value} = target;
setFormState({...formState,[name]: value})
}
     
const onResetForm = () => {setFormState(initialForm)}

const createValidators = () => {
const formCheckedValues = {};

 for (const formField of Object.keys(formValidation)) {
  const [fn, errorMessage ] = formValidation[formField];
formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
}
setFormValidationState(formCheckedValues);
}
  
    return {
...formState,
formState,
onResetForm,
handleChange,
...formValidationState,
isFormValid

    }
}
