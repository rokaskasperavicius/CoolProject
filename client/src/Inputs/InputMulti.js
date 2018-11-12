import React from 'react'
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css'

export const renderFieldMulti = ({
  input, 
  label,
  data, 
  placeholder, 
  autoComplete,
  valueField, 
  textField, 
  validateMulti
}) => (
  <div>
    <label className="label" style={{ fontWeight: "bold" }}>{label}</label>
    <Multiselect
      {...input}
      placeholder={placeholder}
      className={validateMulti ? 'text error-text' : 'text'}
      autoComplete={autoComplete}
      onBlur={() => input.onBlur()}
      value={input.value || []} // requires value to be an array
      data={data}
      valueField={valueField}
      textField={textField}
    />
    {validateMulti && <div style={{ color: 'red' }} className="error">This field is required</div>}
  </div>
);