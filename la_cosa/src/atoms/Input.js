export default function Input({
  type,
  id,
  value = "",
  defaultValue = "",
  placeholder = "",
  name,
  onChange,
  className,
}) {
  return (
    <>
      {value !== "" ? (
        <input
          className={className}
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
      ) : (
        <input
          className={className}
          type={type}
          id={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
      )}
    </>
  );
}
