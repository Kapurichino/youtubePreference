import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
    width: 100%;
    height: 200px;
`

const HeaderWrapper = styled.div`
    width:100%;
    height: 100%;
    padding : 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <HeaderWrapper>
          
        </HeaderWrapper>
      </HeaderContainer>
    </>
  )
}

export default Header
