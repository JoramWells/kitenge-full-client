import React from "react";
import PropTypes from "prop-types";

const STYLES = [
  "btn-cart-solid",
  "btn-warning-solid",
  "btn-primary-solid",
  "btn-primary-outline",

];

const SIZES = ["btn-medium", "btn-small"];

const Button = ({
  color,
  Icon,
  text,
  loading = false,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <div className={`btn-background ${checkButtonStyle}`} onClick={onClick ? (e) => onClick(e) : ""} >
      <div className="btn-flex">
        {loading && <div className="loader" style={{ padding: "0.83rem" }} />}
      </div>
      <div className="btn-flex">
        <button
          className="btn"
          type="submit"
          style={{ display: loading ? "none" : "flex" }}>
          {Icon && <Icon className="h-5" />}
          <div>{text}</div>
        </button>
      </div>
    </div>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  Icon: PropTypes.object,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
Button.defaultProps = {
  color: "",
  text: "",
  Icon: "",
  loading: false,
};

export default Button;
