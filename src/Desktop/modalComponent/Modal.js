import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { XIcon } from "@heroicons/react/outline";

const Background = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 500ms;
  flex-direction: column;
  z-index: 50;
  @media (max-width:800px){

  }
`;

const Content = styled.div`
  border-radius: 5px;
  margin: 15px;
  transition-duration:all 500ms ease-in-out;
  width: 48rem;
  @media(max-width:767px){
    width:21.5rem;
    margin: 10px;
    background-color: #fff;

  }
  /* Motor G4, Galaxy S5 */
  @media(max-width:360px){
    width: 22rem;

  }
  /* Pixel 2 */
  @media(max-width:411px){
    width: 25rem;
  }
  /* iPhone5 */
  @media(max-width:320px){
    width: 19.5rem;
  }
    /* iPhone6 */
    @media(max-width:375px){
    width: 22.5rem;
  }
      /* iPhone6 */
    @media(max-width:280px){
    width: 17rem;
  }
`;

const ModalHeader = styled.div`
  /* position: absolute; */
  /* right: 16%; */
  /* top: 0; */
  width: 2.2rem;
  display: flex;
  justify-content: end;
  align-items: flex-end;
  justify-items: end;
  flex-direction: row;
  /* float: right; */
  @media (max-width:800px){
    display:none !important;
  }
`;

const Modal = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef();

  function closeModal(e) {
    if (modalRef.current === e.target) setShowModal(false);
  }

  const animation = useSpring({
    config: {
      duration: 350,
    },
    opacity: showModal ? 1 : 0,
    // transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) setShowModal(false);
    },
    [setShowModal, showModal]
  );
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  return (
    <>
      {showModal ? (
        <Background data-testid="modal_div" ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <Content showModal={showModal}>
              <div>
                <ModalHeader className="p-2 bg-black rounded-full cursor-pointer bg-opacity-80 ">
                <XIcon
                  className="h-5 text-white"
                  onClick={() => setShowModal((prev) => !prev)}
                />
              </ModalHeader>
              </div>

              {children}
            </Content>  
          </animated.div>

        </Background>
      ) : null}
    </>
  );
};

export default Modal;
