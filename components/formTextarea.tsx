import { ChangeEventHandler } from "react";

interface FormInputProps {
  id: string;
  label?: string;
  description?: string;
  required: boolean;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  minLength?: number;
  value?: string | number;
}

export default function FormTextArea({ id,
  label,
  description,
  required,
  placeholder,
  onChange,
  minLength,
  value }: FormInputProps) {

  return (
    <div className={`${id}-field form-group`}>
      {label && (
        <label className="control-label string color-black" htmlFor={`form_submission_${id}`}>
          {label} {required && (<span className="color-red">*</span>)}
        </label>
      )}
      {description && (
        <p className="color-black f-s-12">
          {description}
        </p>
      )}
      <textarea id={`form_submission_${id}`}
        className="form-control"
        name={id}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        minLength={minLength}
        value={value} />
    </div>
  )
}