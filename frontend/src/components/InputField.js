export default function InputField({ type, placeholder, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      style={{ width: "100%", padding: 10, marginBottom: 10 }}
    />
  );
}