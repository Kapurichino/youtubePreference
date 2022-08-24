import React from 'react'
import styled from 'styled-components'
import {IoMdMail, IoLogoGithub} from 'react-icons/io'

const FooterContainer = styled.div`
  width:100%;
  height:70px;
  border-top: 5px solid skyblue;
  background-color: #f0f8ff;
`

const FooterWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = `
  font-size: 2.5rem;
  padding-right: 1rem;
  cursor : pointer;
`

const GithubIcon = styled(IoLogoGithub)`
  ${Icon}
`

const MailIcon = styled(IoMdMail)`
  ${Icon}
`

const Text = styled.span`
  vertical-align: middle;
  font-size: 1rem;
`

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterWrapper>
          <GithubIcon onClick={()=>{window.open('https://github.com/Kapurichino', '_blank')}}/>
          <MailIcon onClick={()=>{window.location = 'mailto:bsw9698@gmail.com'}}/>
          <Text>ⓒ 2022 Kapurichino. All Rights Reserved.</Text>
        </FooterWrapper>
      </FooterContainer>
    </>
  )
}

export default Footer
