import "./InputField.css";

const InputField = ({ type, name, onChange, placeholder, value }) => {
  return (
    <input
      className="input_field"
      autoComplete="off"
      autoCapitalize="off"
      autoSave="off"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    ></input>
  );
};
export default InputField;
