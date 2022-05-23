import React from "react";

const Input = (props) => {
  return (
    <input
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
      className={
        "p-3 form-control block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " +
        `${props.disabled ? "bg-gray-200" : ""}`
      }
      onChange={props.onChange}
      value={props.value}
      disabled={props.disabled}
    />
  );
};

export default Input;
