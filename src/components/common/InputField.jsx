const InputField = ({ register, name, type, placeholder, error }) => (
  <div className="space-y-1">
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0E2A45] focus:border-transparent outline-none
        ${error ? "border-red-500" : "border-gray-300"}`}
    />
    <div className="h-1">
      {error && <p className="text-red-500 text-[12px]">{error.message}</p>}
    </div>
  </div>
);

export default InputField;
