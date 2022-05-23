import React from "react";

const Textarea = (props) => {
  return (
    <textarea
      className="p-3 form-control block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      id={props.id}
      name={props.name}
      rows={props.rows}
      placeholder={props.placeholder}
      style={{ resize: "none" }}
      onChange={props.onChange}
      value={props.value}
    ></textarea>
  );
};

export default Textarea;
