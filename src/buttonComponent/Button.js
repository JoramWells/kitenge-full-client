import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types'

const Button = ({ color, Icon, text, loading = false,onClick }) => {
  const handleClick = () =>{
    
  }
  return (
    <Background>
      <Flex>
        {loading && (
          <div className="loader" style={{ padding: "0.83rem" }} />
        )}
      </Flex>
      <Flex>
          <Btn  type="submit" style={{display:loading? "none":"flex"}} onClick={onClick?(e)=>onClick(e):""}>
              {Icon && <Icon className="h-5" />}
              <div style={{color:"whitesmoke"}} >
                {text}  
              </div>
              
          </Btn>
          
      </Flex>
    </Background>
  );
};

const Btn = styled.button`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  color: white;
  font-size: 1.1rem;
  padding: .32rem;
`;

const Background = styled.div`
  border-radius: 5px;
  background-color: black;
  color: white;
  padding: .1rem;
  width: 100%;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

Button.propTypes={
    color:PropTypes.string,
    text:PropTypes.string,
    Icon:PropTypes.object,
    loading:PropTypes.bool,
    onClick:PropTypes.func
}
Button.defaultProps = {
    color:"",
    text:"",
    Icon:"",
    loading:false
}

export default Button;
