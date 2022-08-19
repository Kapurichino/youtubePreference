import React from 'react'
import styled from 'styled-components'
import { AiOutlinePlusSquare } from 'react-icons/ai'

const BodyContainer = styled.div`
    position: absolute;
    margin-top: 70px;
    width:100%;
`

const BodyWrapper = styled.div`
    padding:40px;
`

const Video = styled.div`

`

const KeyWord = styled.div`
    display: flex;
    align-items: center;
`

const PlusIcon = styled(AiOutlinePlusSquare)`
    font-size: 2.5rem;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    &:hover{
        scale: 1.2;
    }
`

const KeywordText = styled.span`
    margin-left: 10px;
    font-size: 1.5rem;
`

const Body = ({setOpen}) => {
  const open = (e) => {
    document.body.style.overflow = "hidden";
  }
  return (
    <>
      <BodyContainer>
        <BodyWrapper>
          <KeyWord><PlusIcon onClick={()=>{setOpen(true); open();}}/><KeywordText>키워드 추가</KeywordText></KeyWord>
          <Video>
          </Video>
        </BodyWrapper>
      </BodyContainer>
    </>
  )
}

export default Body
