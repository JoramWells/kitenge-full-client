import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { XIcon } from "@heroicons/react/outline";

const portal = document.getElementById("portal");

const Background = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
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
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  transition-duration: 500ms;
  width: 19rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ModalHeader = styled.div``;

const Modal = ({ showModal, setShowModal, children }) => {
  return (
    <>
      {showModal ? (
        <Background data-testid="modal_div">
          <Content showModal={showModal}>
            <ModalHeader className="flex flex-row justify-end">
              <XIcon className="h-5 text-gray-600" onClick={()=>setShowModal(prev => !prev)} />
            </ModalHeader>
            {children}
          </Content>
        </Background>
      ) : null}
    </>
  );
};

export default Modal;
