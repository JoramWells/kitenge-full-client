import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const STYLES = [
  "btn-primary-solid",
  "btn-warning-solid",
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
    <Background>
      <Flex>
        {loading && <div className="loader" style={{ padding: "0.83rem" }} />}
      </Flex>
      <Flex>
        <button
        className="btn"
          type="submit"
          style={{ display: loading ? "none" : "flex" }}
          onClick={onClick ? (e) => onClick(e) : ""}
        >
          {Icon && <Icon className="h-5" />}
          <div style={{ color: "whitesmoke" }}>{text}</div>
        </button>
      </Flex>
    </Background>
  );
};

const Background = styled.div`
  border-radius: 5px;
  background-color: black;
  color: white;
  padding: 0.1rem;
  width: 100%;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

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
