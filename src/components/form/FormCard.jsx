import PropTypes from "prop-types";
import './FormCard.css';

export const FormCard = ({ title, children }) => {
  return (
    <div className="auth-card-background">
        <div className="auth-card-container">
            <h1 className="auth-card-title">
                {title}
            </h1>
            {children}
        </div>
    </div>
  );
};

FormCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};