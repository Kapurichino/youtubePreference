import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/swiper.scss"
import "./Body.css"
import axios from 'axios'

// keyword 저장

const keywordArray = [];
const apiData = [];
let cnt = 0;


const BodyContainer = styled.div`
  margin-top: 80px;
  width:100%;

`

const BodyWrapper = styled.div`
  padding:40px;
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

const KeywordInput = styled.input`
    font-size: 1.5rem;
`

const ListWrapper = styled.div`
    width: 100%;
    padding-top:30px;
`

const Body = () => {
  const [input, setInput] = useState("");
  const [show, setShow] = useState([false]);
  const [params, setParams] = useState({
    key:process.env.REACT_APP_YOUTUBE_API_KEY,
    part: 'snippet',
    maxResults: 3,
    q: '',
    type: 'video',
    videoDuration:'medium',
  });
  axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';
  
  let keyword = "";


  async function fetchData(){
    await axios.get('/search', {params}).then((res)=>{apiData.push(res.data.items)}).catch(err=>console.log(err));
    setShow((show)=>{
      let copy = [...show, false];
      copy[cnt] = true;
      cnt++;
      return copy;
    });
  }

  useEffect(()=>{
    if(params.q !== ''){
      fetchData();
      console.log(apiData);
    }
  }, [params])
  
//   const bodyScrollStop = (e) => {
//     document.body.style.overflow = "hidden";
//   }


 
  return (
    <>
      <BodyContainer>
        <BodyWrapper>
          <KeyWord>
            <KeywordInput type="text" onChange={(e)=>{setInput(e.target.value)}}/>
            <PlusIcon onClick={()=>{
              keywordArray.push(input);
              let copy = {...params};
              keyword = input;
              copy.q = keyword;
              setParams({...copy});
            }}/>
            <KeywordText>키워드 추가
            </KeywordText>
          </KeyWord>
          <ListWrapper>
            {keywordArray.map((list,index)=>{
              return(
                <div key={index}>
                    <h1>{list}</h1>
                    <Swiper
                    spaceBetween={30}
                    slidesPerView={"auto"}
                    slidesPerGroup={1}
                    loop={true}
                    breakpoints={{
                      0:{
                        slidesPerView:1,
                      },
                      760:{
                        slidesPerView:2,
                      },
                      960:{
                        slidesPerView: 4,
                        spaceBetween:50
                      }
                    }}
                    >
                      {     
                      show[index] && 
                        apiData[index].map((apiData, index)=>{
                          return(
                              <SwiperSlide key={index}>
                                <iframe src={`https://www.youtube.com/embed/${apiData.id.videoId}`} title={apiData.snippet.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} style={{ width:"100%",
              height:"100%"}}></iframe>
                              </SwiperSlide>
                          )
                        })
                      }
                    </Swiper>
                </div>)
            })}
          </ListWrapper>
        </BodyWrapper>
      </BodyContainer>
    </>
  )
}

export default Body
