import { ChangeEvent, Dispatch, SetStateAction } from "react";

export function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>,
  setState: Dispatch<SetStateAction<any>>,
  state: any) {
  const name = event.target.name;
  const value = event.target.value;
  setState({ ...state, [name]: value });
}

export function handleChangeCheckbox(event: ChangeEvent<HTMLInputElement>, setState: Dispatch<SetStateAction<any>>,
  state: any) {
  const name = event.target.name;
  const value = event.target.checked;
  setState({ ...state, [name]: value });
}