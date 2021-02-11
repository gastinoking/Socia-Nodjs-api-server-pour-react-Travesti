import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function TextFieldGroup({
  type,
  placeholder,
  onChange,
  value,
  errors,
  name,
  info,
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control", {
          " is-invalid": errors,
        })}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  errors: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};
TextFieldGroup.defaultProps = {
  type: "text",
};
export default TextFieldGroup;
