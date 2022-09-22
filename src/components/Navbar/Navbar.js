import React, { useEffect } from 'react'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import styled from 'styled-components'
import BgColor from './BgColor'

const NavbarContainer = styled.div`
    width: 100%;
    height: 80px;
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
  margin-left: 50px;
  font-size: 2rem;
  color:${({color})=>(color === 1 ? "white":"black")};
`

const Search =styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const Icon = `
  font-size: 3rem;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  &:hover{
      scale: 1.2;
  }
  @media screen and (max-width:476px){
    font-size: 2rem;
  }
`

const KeyWord = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`
const KeywordInput = styled.input`
  font-size: 1.75rem;
  @media screen and (max-width: 476px){
    font-size: 1.2rem;
  }
`

const PlusIcon = styled(AiOutlinePlusSquare)`
  ${Icon};
  color:${({color})=>(color === 1 ? "white":"black")};
`

const Navbar = ({bgColor, setBgColor, setInput, clicked, setClicked})=> {
  
  return (
    <>
      <NavbarContainer navColor={bgColor}>
        <NavbarWrapper>
          <NavbarName color={bgColor}>Kapurichino</NavbarName>
          <Search>
            <KeyWord>
              <KeywordInput placeholder=' Input Keyword' type="text" onChange={(e)=>{setInput(e.target.value)}}/>
              <PlusIcon color={bgColor} onClick={()=>{
                setClicked(clicked+1);       
              }}/>
              
            </KeyWord>
            <BgColor bgColor={bgColor} setBgColor={setBgColor}/>
          </Search>
          
        </NavbarWrapper>
      </NavbarContainer>
      
    </>
  )
}

export default Navbar
