import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import KeyWordModal from './components/KeyWordModal';
import Navbar from './components/Navbar/Navbar';

const Container = styled.div`
  width:100%;
  padding: 1px;
  background-color: ${({BgColor})=>(BgColor===1?"white":"rgb(36, 36, 36)")};
`

function App() {
  // const [input, setInput] = useState("");
  const [bgColor, setBgColor] = useState(1);
  // const [open, setOpen] = useState(false);
  return (
    <>
      {/* {console.log(open)} */}
      <Navbar bgColor={bgColor} setBgColor={setBgColor}/>
      <Container BgColor={bgColor}>
        {/* {open === true ? <KeyWordModal setOpen={setOpen} setInput={setInput}/> : null} */}  
        {/* <Header/> */}
        <Body/>
        <Footer/>
      </Container>
    </>
  );
}


export default App;
