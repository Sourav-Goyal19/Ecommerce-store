import clsx from "clsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  disabled?: boolean;
  placeholder?: string;
  onChange?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  required,
  register,
  errors,
  disabled,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={clsx(
          "block text-base leading-6 capitalize",
          errors[id]
            ? "text-red-600 font-semibold"
            : "text-gray-900 font-semibold"
        )}
      >
        {label}
      </label>
      <input
        className={clsx(
          "block w-full rounded-md mt-2 py-2 px-3 border  shadow-sm outline-none text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-black sm:leading-6",
          disabled && "opacity-50 cursor-default"
        )}
        id={id}
        type={type}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id, {
          required,
          onChange: (e) => {
            if (onChange) onChange();
          },
        })}
        autoComplete={id}
      />
      {errors[id] && (
        <p className="mt-2 text-red-600 font-semibold" id={`${id}-error`}>
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Input;
