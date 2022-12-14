import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import ScrollTop from './components/ScrollTop';
import Progressbar from './components/Progressbar';
import * as Scroll from 'react-scroll';
import { ProgressBar } from 'react-bootstrap';

const Container = styled.div`
  width:100%;
  padding-top: 1px;
  background-color: ${({BgColor})=>(BgColor===1?"white":"rgb(36, 36, 36)")};
`

function App() {
  // const [input, setInput] = useState("");
  const bgData = JSON.parse(localStorage.getItem('bgColor'));
  const [bgColor, setBgColor] = useState(bgData);
  const [clicked, setClicked] = useState(0);
  const [input, setInput] = useState("");
  const [navSearchBar, setNavSearchBar] = useState(false);
  let scroll = Scroll.animateScroll;
  useEffect(()=>{
    localStorage.setItem('bgColor', JSON.stringify(bgColor));
  },[bgColor]);
  // const [open, setOpen] = useState(false);
  return (
    <>
      {/* {console.log(open)} */}
      <Progressbar/>
      <ScrollTop scroll={scroll}/>
      <Navbar navSearchBar={navSearchBar} clicked={clicked} setClicked={setClicked} bgColor={bgColor} setBgColor={setBgColor} setInput={setInput}/>
      <Container BgColor={bgColor}>
        {/* {open === true ? <KeyWordModal setOpen={setOpen} setInput={setInput}/> : null} */}  
        {/* <Header/> */}
        <Body setNavSearchBar={setNavSearchBar} clicked={clicked} bgColor={bgColor} input={input} setInput={setInput}/>
        <Footer/>
      </Container>
    </>
  );
}


export default App;
