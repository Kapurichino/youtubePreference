import { FaChevronCircleUp } from "react-icons/fa"
import { throttle } from "lodash";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";


const UpScroll = styled(FaChevronCircleUp)`
    position:fixed;
    bottom:5%;
    right:3%;
    opacity: 0.5;
    border: none;
    font-size: 3rem;
    color: rgb(238, 228, 228);
    background-color: rgb(88, 118, 252);
    border-radius: 50%;
    display: ${({activate})=>(activate === 1 ? "inline-block":"none")};
    &:hover{
        cursor: pointer;
    }
`


export default function ScrollTop(props){
    const [scrollToTop, setScrollToTop] = useState(0);
    const [btnStatus, setBtnStatus] = useState(0);
    const eleRef = useRef();
    
    const updateFollow = ()=>{
        setScrollToTop(window.scrollY);
        scrollToTop > 200 ? setBtnStatus(1) : setBtnStatus(0)
    };
    const handleFollow = throttle(updateFollow, 150);

    const handleTop = ()=>{
        props.scroll.scrollToTop({duration:300});
        setScrollToTop(0);
    }

    useEffect(()=>{
        window.addEventListener('scroll', handleFollow)
        return ()=>{
            window.removeEventListener('scroll', handleFollow)
        };
    })
    return(
        <>
            <UpScroll refs={eleRef} activate={btnStatus} onClick={handleTop}/>
        </>
    );
}