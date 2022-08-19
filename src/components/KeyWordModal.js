import React,{useState} from 'react'
import styled from 'styled-components'
import {ImCross} from "react-icons/im"
import {AiOutlineSearch} from "react-icons/ai"

const Overlay = styled.div`
    position:absolute;
    width: 100%;
    height: 100vh;
    background-color: black;
    opacity: 0.5;
    z-index: 2;
`

const KeywordInput = styled.input`
    width: 80%;
    font-size: 1.5rem;
`

const ModalContainer = styled.div`
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ModalWrapper = styled.div`
    width: 300px;
    height: 500px;
    padding:30px;
    border-radius: 20px;
    background-color: white;
    position: relative;
`

const CloseIcon = styled(ImCross)`
    float: right;
    font-size: 2rem;
    cursor: pointer;
`

const SearchIcon = styled(AiOutlineSearch)`
    font-size: 1.5rem;
`

const Button = styled.button`
    height: 2.5rem;
    width: 20%;
    background-color: transparent;
    border: 1px solid black;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`

const InputWrapper = styled.div`
    margin-top: 3rem;
    display: flex;
    align-items: self;
`

const KeyWordModal = ({setOpen, setInput}) => {
  
  const bodyScrollMove = (e) => {
    document.body.style.overflow = "unset";
  }

  return (
    <>
      <Overlay/>
      <ModalContainer>
        <ModalWrapper>
          <CloseIcon onClick={()=>{setOpen(false); bodyScrollMove();}}/>
          <InputWrapper>
            <KeywordInput type="text" onChange={(e)=>{setInput(e.target.value)}}/><Button><SearchIcon/></Button>
          </InputWrapper>
        </ModalWrapper>
      </ModalContainer>
    </>
  )
}

export default KeyWordModal;
