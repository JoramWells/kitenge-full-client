import React, { useState } from "react";
import PropTypes from "prop-types";
import { validateInput } from "../../utilities/Validator";

const Input = ({
  placeholder,
  Icon,
  validators,
  type,
  value,
  onChange,
}) => {
  const [error, setError] = useState(false);
  const handleChange = (event) => {
    const { value } = event.target;
    setError(validateInput(validators, value));
    onChange(value);
  };
  return (
    <>
      <div
        style={{ width: "18rem" }}
        className="bg-white w-full my-2 flex flex-row items-center  ring-1 ring-gray-200 p-1 rounded-md "
        data-testid="input_form"
      >
        {Icon && <Icon className="h-5 text-gray-400" />}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          className="w-full focus:outline-none text-gray-500 rounded-md p-1 text-sm"
          onChange={handleChange}
        />
      </div>
      <div className="h-2 flex justify-start">
        {error && <p className="text-xs text-red-400 -mt-1">{error.message}</p>}
      </div>
    </>
  );
};
InputFormComponent.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  validators: PropTypes.array,
  onChange: PropTypes.func,
  Icon: PropTypes.func,
};
InputFormComponent.defautlProps = {
  value: "",
  placeholder: "",
  type: "",
  validators: [],
  onChange: "",
  Icon: "",
};
export default InputFormComponent;
