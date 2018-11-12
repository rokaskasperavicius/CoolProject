import React from 'react'
import { Input } from 'semantic-ui-react'

export const renderField = ({
  input,
  type,
  label,
  placeholder,
  autoComplete,
  disabled,
  transparent,
  meta: { touched, error, warning }
}) => (
  <section>
    <label className="label" style={{ fontWeight: "bold" }}>{label}</label>
    <Input
      {...input}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      transparent={transparent}
      className={touched ? 'text error-text ' : 'text'}
      autoComplete={autoComplete}
    />
    {touched && ((error && <div style={{ color: 'red' }} className="error">{error}</div>) || (warning && <div className="error">{warning}</div>))}
  </section>
);