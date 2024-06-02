import React from "react";

function Input(props) {
  return (
    <form onSubmit={props.handleSubmit} className="mt-3 mb-3">
      <label>
        <input
          className="form-control"
          type="text"
          required={true}
          value={props.input}
          onChange={props.handleChange}
        />
      </label>
      <input className="btn btn-primary ms-2" type="submit" value="Create" />
    </form>
  );
}

export default Input;
