import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export const Button = ({ onClick, disabled, label }) => {
  return (
    <div className="button-container">
      <button
        className={`button ${disabled ? "disabled" : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};
