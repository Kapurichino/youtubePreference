import React, { useEffect } from 'react'
import styled from 'styled-components'


const ButtonGroup = styled.div`
    width: 150px;
    height: 45px;
    border-radius: 10px;
    overflow: hidden;   
`

const Button = styled.button`
    width:50%;
    height:100%;
    border: none;
    background-color: ${({btnColor})=>(btnColor)};
    color: ${({textColor})=>(textColor)};
    cursor: pointer;
`

const BgColor = ({setBgColor}) => {



  
    return (
        <>
            <ButtonGroup>
                <Button textColor={"black"} btnColor={"white"} onClick={()=>{setBgColor(1)}}>
                    White
                </Button>
                <Button textColor={"white"} btnColor={"black"} onClick={()=>{setBgColor(0)}}>
                    Black
                </Button>
            </ButtonGroup>
        </>
    )
}

export default BgColor
