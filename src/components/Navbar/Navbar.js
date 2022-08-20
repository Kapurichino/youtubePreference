import React from 'react'
import styled from 'styled-components'
import BgColor from './BgColor'

const NavbarContainer = styled.div`
    width: 100%;
    height: 70px;
    position:fixed;
    z-index: 2;
    padding:10px;
    background-color: ${({navColor})=>(navColor === 1 ? "black" : "aliceblue")};
    display: flex;
    align-items: center;
`

const NavbarWrapper = styled.div`
    width: 100%;
    height: 100%;
    position:relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NavbarName= styled.h1`
    color:${({color})=>(color === 1 ? "white":"black")};
`

const Navbar = ({bgColor, setBgColor})=> {
  return (
    <>
      <NavbarContainer navColor={bgColor}>
        <NavbarWrapper>
          <NavbarName color={bgColor}>Kapurichino</NavbarName>
          <BgColor bgColor={bgColor} setBgColor={setBgColor}/>
        </NavbarWrapper>
      </NavbarContainer>
      
    </>
  )
}

export default Navbar
