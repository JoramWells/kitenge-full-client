import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { XIcon } from "@heroicons/react/outline";

const Background = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 500ms;
  flex-direction: column;
  z-index: 50;
`;

const Content = styled.div`
  background-color: #fff;
  border-radius: 5px;
  margin: 15px;
  transition-duration: 500ms;
  width: 30rem;
`;

// const ModalImg = styled.img`
//   width: 100%;
//   height: 100%;
//   border-radius: 10px 0 0 10px;
//   background:#000;

// `

const ModalHeader = styled.div``;

const Modal = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef();

  function closeModal(e) {
    if (modalRef.current === e.target) setShowModal(false);
  }

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) setShowModal(false);
    },
    [setShowModal, showModal]
  );
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return document.removeEventListener("keydown", keyPress);
  }, []);
  return (
    <>
      {showModal ? (
        <Background data-testid="modal_div" ref={modalRef} onClick={closeModal}>
          <Content showModal={showModal}>
            <ModalHeader className="flex flex-row justify-end p-1">
              <XIcon
                className="h-5 text-gray-600"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalHeader>
            {children}
          </Content>
        </Background>
      ) : null}
    </>
  );
};

export default Modal;
