import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePickerForm = props => {
  const {
    value,
    onChange,
    error,
    errorText,
    label
  } = props

  const hoy = new Date()

  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="col-6 pl-4">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={label ? label : 'Pick a date'}
          value={value ? value : hoy}
          onChange={onChange ? onChange : ()=>{}}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default DatePickerForm