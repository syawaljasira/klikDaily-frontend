import React from "react";

const Select = (props) => {
  return (
    <select
      name={props.name}
      id={props.id}
      className="text-base w-full p-3 rounded-sm form-select appearance-none block font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      onChange={props.onChange}
      value={props.value}
    >
      {props.children}
    </select>
  );
};

export default Select;
