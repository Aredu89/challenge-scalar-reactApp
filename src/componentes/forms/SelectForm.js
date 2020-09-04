import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Spinner from '../common/Spinner'
import { makeStyles } from '@material-ui/core/styles';
import './SelectForm.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectForm = props =>{
  //options: Array con formato [{ value: 10, label: "Diez" }]
  const {
    label,
    value,
    options,
    onChange,
    error,
    errorText,
    loading
  } = props
  const classes = useStyles();

  return(
    <div className="select-form w-100">
      {
        loading ?
        <Spinner />
        :
        <FormControl
          variant="outlined"
          className={classes.formControl}
          error={error}
          >
          <InputLabel id={`select-${label}`}>{label ? label : ""}</InputLabel>
          <Select
            labelId={`select-${label}`}
            id={`select-${value}`}
            value={value ? value : ""}
            onChange={onChange}
            label={label ? label : ""}
          >
            <MenuItem value={null}>Sin seleccionar</MenuItem>
            {
              options ?
              options.length > 0 ?
              options.map((option, i)=>{
                return(
                  <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
                )
              })
              : null
              : null
            }
          </Select>
          {
            error && errorText &&
            <FormHelperText>{errorText}</FormHelperText>
          }
        </FormControl>
      }
    </div>
  )
}

export default SelectForm