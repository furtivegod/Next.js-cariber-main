import { ChangeEventHandler } from "react";

interface SelectItem {
  value: string;
  text: string;
}

interface FormInputProps {
  id: string;
  label?: string;
  description?: string;
  required: boolean;
  placeholder?: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  item: SelectItem[] | string[];
}

export default function FormSelect({ id,
  label,
  description,
  required,
  placeholder,
  onChange,
  item,
  value }: FormInputProps) {

  return (
    <div className={`${id}-field form-group`}>
      <label className="control-label string color-black" htmlFor={`form_submission_${id}`}>
        {label} {required && (<span className="color-red">*</span>)}
      </label>
      <p className="color-black f-s-12">
        {description}
      </p>
      <select id={`form_submission_${id}`}
        className="form-control"
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}>
        <option value="">เลือก</option>
        {item.map((value, index) => {
          if (typeof value === "string") {
            return (
              <option key={index} >{value}</option>
            )
          } else if (typeof value === "object") {
            return (
              <option key={index} value={value.value}>{value.text}</option>
            )
          }
        })}
      </select>
    </div>
  )
}