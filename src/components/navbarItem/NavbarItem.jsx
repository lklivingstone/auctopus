import React from "react";
import PropTypes from "prop-types";
import "./NavbarItem.css";

export const NavbarItem = ({ onClick, disabled, label }) => {
  return (
    <div className="button-container">
      <button
        className={`nav-button ${disabled ? "disabled" : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

NavbarItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};
