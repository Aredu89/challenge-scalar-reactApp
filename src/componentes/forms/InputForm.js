import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import './InputForm.css';

const InputForm = props =>{
  //Type puede ser: "password"
  const {
    label,
    type,
    onChange,
    value,
    error,
    errorText,
    inputProps,
    simbolo,
    multiline,
    rows
  } = props

  const auxInputProps = {
    ...inputProps
  }

  if(simbolo){
    auxInputProps.startAdornment = <InputAdornment position="start">{simbolo}</InputAdornment>
  }

  return(
    <div className="input-form w-100">
      <TextField
        id={label ? label.toString() : 'input-form'} 
        label={label}
        variant="outlined"
        type={type ? type : ""}
        onChange={event=>onChange(event)}
        value={value}
        error={error ? error : false}
        helperText={errorText && error ? errorText : ""}
        InputProps={auxInputProps}
        inputProps={auxInputProps}
        multiline={multiline ? true : false}
        rows={rows ? rows : 4}
        />
    </div>
  )
}

export default InputForm