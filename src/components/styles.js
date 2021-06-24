import styled from "styled-components";

export const Flex = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-items: center;
   justify-content: space-between;
   @media(max-width:767px){
       justify-content: space-around;
       align-items: center;
   }
`

export const Container = styled.div`
  max-width: 83%;
  float: right;
  margin-top: 5rem;
  padding: 1.55rem;
  background-color: rgba(248, 248, 248, 0.2);
`;

export const Skeleton = styled.div`
height: 240px;
width: 14rem;
background-color: white;
justify-content: center;
align-items: center;
display: flex;
flex-direction: column;
@media (max-width: 767px) {
  width: 18rem;
}
`;

export const Form = styled.div`
background-color:white;
padding:1rem;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
display:block;
margin:auto;
width:24rem;
/* height:25rem; */
@media(max-width: 767px){
  width:22rem;
}
`

export const Row = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

export const Navbar = styled.nav`
display: flex;
justify-content: space-between;
background-color: white;
padding: .5rem;
align-items: center;
flex-direction: row;
position: fixed;
top: 0;
z-index: 50;
width: 100%;
`

export const Sidenav = styled.nav`
  padding-top: 3.77rem;
  width: 17%;
  height: 100%;
  background-color: white;
  display: fixed;
  z-index: 1;
  text-align: center;
`;

export const Li = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  align-content: center;
  padding: 0.2rem;
  :hover {
    cursor: pointer;
    color: gray;
    /* background-color: white; */
  }
  color: black;
  margin: 0.3rem;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 5rem;
  margin-bottom: 3rem;
`;

export const Card = styled.div`
background-color:white;
padding:1rem;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
display:block;
margin:auto;
width:24rem;
/* height:25rem; */
@media(max-width: 767px){
  width:22rem;
}
`;

