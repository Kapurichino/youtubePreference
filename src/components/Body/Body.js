/**
 * @todo 
 * 1. 속도 향상.
 * 2. 스와이퍼에 로딩창 구현 후 순차적으로 처리.
 * 3. 스와이퍼에서 유튜브를 틀고 있는 상태에서 넘길 때, 동영상 정지 처리.
 */

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import {FaTrash} from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/swiper.scss"
import 'swiper/components/pagination/pagination.scss'
import SwiperCore, { 
  Pagination,
} from "swiper";
import "./Body.css"
import axios from 'axios'

SwiperCore.use([Pagination]);

const keywordArray = [];
const apiData = [];
let cnt = 0;



const BodyContainer = styled.div`
  margin-top: 80px;
  width:100%;
  height : auto;
  min-height: 1600px;
  color:${({Color})=>(Color === 1 ? "black" : "white")};
  transition: 0.3s ease-in-out;
`

const BodyWrapper = styled.div`
  padding:40px;
`


const KeyWord = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
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

const PlusIcon = styled(AiOutlinePlusSquare)`
  ${Icon};
`

const TrashIcon = styled(FaTrash)`
  padding-left: 10px;
  ${Icon};
`

const KeywordInput = styled.input`
  font-size: 1.75rem;
  @media screen and (max-width: 476px){
    font-size: 1.2rem;
  }
`

const ListWrapper = styled.div`
  width: 100%;
  padding-top:30px;
`
const Text = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h1`
  font-size: 3rem;
`


const Body = ({clicked, bgColor, input, setInput}) => {
  const [show, setShow] = useState([false]);
  const [params, setParams] = useState({
    key:process.env.REACT_APP_YOUTUBE_API_KEY,
    part: 'snippet',
    maxResults: 10,
    q: '',
    type: 'video',
    videoDuration:'medium',
    videoEmbeddable:'true',
    videoSyndicated:'true',
  });
  axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';
  /**
   * keyword를 keyword 배열에 저장하고, 파라미터에 키워드 추가.
   */
   const setVideo = () => {
    if(input != ''){
      keywordArray.push(input);
      let copy = {...params};
      copy.q = input;
      setParams({...copy});
    }
  }
  
  useEffect(()=>{
    if (clicked != 0){
      setVideo();
    }
  },[clicked])
  
  /**
   * 로컬 스토리지에 저장된 데이터를 삭제
   * @param {number} index 추가된 키워드의 위치
   */
  const removeData = (index) =>{
    localStorage.removeItem(`keyword${index}`);
    for(let x = index+1; x < cnt; x++){
      localStorage.setItem(`keyword${x-1}`, JSON.stringify(JSON.parse(localStorage.getItem(`keyword${x}`))));
    }
    localStorage.removeItem(`keyword${cnt-1}`);
    localStorage.removeItem(`keywordData${index}`);
    for(let x = index+1; x < cnt; x++){
      localStorage.setItem(`keywordData${x-1}`, JSON.stringify(JSON.parse(localStorage.getItem(`keywordData${x}`))));
    }
    localStorage.removeItem(`keywordData${cnt-1}`);
    (cnt-1) > 0 ? localStorage.setItem('count', JSON.stringify(cnt-1)) : localStorage.removeItem('count');
    keywordArray.splice(index,1);
    apiData.splice(index,1);
    setShow((show)=>{
      let copy = show.filter((show)=>show === true);
      copy[cnt-1] = false;
      cnt = cnt-1;
      return copy; 
    })
  }
  /**
   * axios를 통해 받아온 데이터를 로컬 스토리지와 apiData에 저장
   */
  async function fetchData(){
    await axios.get('/search', {params})
    .then((res)=>{
      apiData.push(res.data.items); 
      localStorage.setItem(`keywordData${cnt}`, JSON.stringify(res.data.items));
      localStorage.setItem(`keyword${cnt}`, JSON.stringify(input));
      localStorage.setItem('count', JSON.stringify(cnt+1));
      setShow((show)=>{
        let copy = [...show, false];
        copy[cnt] = true;
        ++cnt;
        return copy;
      });
    })
    .catch(err=>console.log(err));
  }

  useEffect(()=>{
    if(params.q !== ''){
      fetchData();
    }
  }, [params])
  /**
   * 처음 렌더링 될 때, 로컬스토리지에 저장된 데이터를 불러옴
   */
  useEffect(()=>{
    let count = JSON.parse(localStorage.getItem('count'));
    if(count != 0){
      for(let x=0; x<count; x++){
        if(localStorage.getItem(`keywordData${x}`) !== null){
          apiData.push(JSON.parse(localStorage.getItem(`keywordData${x}`)));
          keywordArray.push(JSON.parse(localStorage.getItem(`keyword${x}`)));
          setShow((show)=>{
            let copy = [...show, false];
            copy[cnt] = true;
            cnt++;
            return copy;
          });
        }
      }
     
    }
  },[])
  
//   const bodyScrollStop = (e) => {
//     document.body.style.overflow = "hidden";
//   }


 
  return (
    <>
      <BodyContainer Color={bgColor}>
        <BodyWrapper>
          <Text>
            <Title>키워드 추가</Title>
          </Text>
          <KeyWord>
            <KeywordInput type="text" onChange={(e)=>{setInput(e.target.value)}}/>
            <PlusIcon onClick={()=>{
              setVideo();       
            }}/>
            
          </KeyWord>
          <ListWrapper>
            {keywordArray.map((list,index)=>{
              return(
                <div key={index}>
                    <Text>
                      <Title>{list}</Title> <TrashIcon onClick={()=>{removeData(index);}}/>
                    </Text> 
                    <Swiper
                    pagination={{
                      dynamicBullets: true,
                      clickable: true,
                    }}
                    spaceBetween={30}
                    slidesPerView={"auto"}
                    slidesPerGroup={1}
                    breakpoints={{
                      0:{
                        slidesPerView:1,
                      },
                      760:{
                        slidesPerView:2,
                      },
                      1280:{                               
                        slidesPerView: 3,
                        spaceBetween:50
                      }
                    }}
                    >
                      {     
                      show[index] && 
                        apiData[index].map((apiData, index)=>{
                          return(
                              <SwiperSlide key={index}>
                                <iframe src={`https://www.youtube.com/embed/${apiData.id.videoId}`} loading="lazy" title={apiData.snippet.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} style={{width:'100%', height:'80%'}}></iframe>
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
