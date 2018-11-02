import React from 'react'
import { Dropdown } from 'semantic-ui-react'

export const renderFieldDrop = ({
  input,
  type,
  label,
  placeholder,
  autoComplete,
  disabled,
  transparent,
  meta: { touched, error, warning }
}) => (
  <div>
    <label className="label">{label}</label>
    <Dropdown 
      transparent={transparent}
      selection
      options={[{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }]}
      autoComplete={autoComplete}
    />
    {touched && ((error && <div style={{ color: 'red' }} className="error">{error}</div>) || (warning && <div className="error">{warning}</div>))}
  </div>
);