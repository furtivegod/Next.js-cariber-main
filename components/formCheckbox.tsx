import { ChangeEventHandler } from "react";

interface FormInputProps {
  id: string;
  label?: string;
  checked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function FormCheckbox({ id,
  label,
  checked,
  onChange }: FormInputProps) {

  return (
    <div className={`${id}-field p-5`}>
      <div className="checkbox">
        <label>
          <input className={`w-18 h-18`}
            id={`form_submission_${id}`}
            name={id}
            type="checkbox"
            checked={checked}
            value={label}
            onChange={onChange} />
          <span className="p-l-5 color-black">
            {label}
          </span>
        </label>
      </div>
    </div>
  )
}