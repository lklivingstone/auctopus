import './FormInput.css';

const FormInput = ({ id, type, placeholder, value, onChange, onBlur, error, touched }) => {
  return (
    <>
      <label htmlFor={id}>{id}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={error && touched ? "input-error" : ""}
      />
      {error && touched && <p className="error">{error}</p>}
    </>
  );
};

export default FormInput;
