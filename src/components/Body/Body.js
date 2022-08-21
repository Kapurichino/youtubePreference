import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import {FaTrash} from 'react-icons/fa'
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
  font-size: 2.5rem;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  &:hover{
      scale: 1.2;
  }
`

const PlusIcon = styled(AiOutlinePlusSquare)`
  ${Icon};
`

const TrashIcon = styled(FaTrash)`
  ${Icon};
`

const KeywordInput = styled.input`
  font-size: 1.5rem;
`

const ListWrapper = styled.div`
  width: 100%;
  padding-top:30px;
`
const Text = styled.div`

`

const Title = styled.h1`
  display: inline;
`


const Body = ({bgColor}) => {
  const [input, setInput] = useState("");
  const [show, setShow] = useState([false]);
  const [params, setParams] = useState({
    key:process.env.REACT_APP_YOUTUBE_API_KEY,
    part: 'snippet',
    maxResults: 1,
    q: '',
    type: 'video',
    videoDuration:'medium',
    videoEmbeddable:'true',
    videoSyndicated:'true',
  });
  axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';

  const setVideo = () => {
    keywordArray.push(input);
    let copy = {...params};
    copy.q = input;
    setParams({...copy});
  }

  const removeData = (index) =>{
    localStorage.removeItem(`keyword${index}`);
    localStorage.removeItem(`keywordData${index}`);
    (cnt-1) > 0 ? localStorage.setItem('count', JSON.stringify(cnt-1)) : localStorage.removeItem('count');
    keywordArray.splice(index,1);
    apiData.splice(index,1);
    setShow((show)=>{
      let copy = show.filter((show)=>show === true);
      console.log(copy);
      console.log(cnt);
      copy[cnt-1] = false;
      cnt = cnt-1;
      return copy; 
    })
   
    
  }

  useEffect(()=>{
    console.log(apiData);
    console.log(keywordArray);
    console.log(show);
  },[show])

  async function fetchData(){
    await axios.get('/search', {params})
    .then((res)=>{
      apiData.push(res.data.items); 
      localStorage.setItem(`keywordData${cnt}`, JSON.stringify(res.data.items));
      localStorage.setItem(`keyword${cnt}`, JSON.stringify(input));
      localStorage.setItem('count', JSON.stringify(cnt+1));
    })
    .catch(err=>console.log(err));
    setShow((show)=>{
      let copy = [...show, false];
      copy[cnt] = true;
      ++cnt;
      return copy;
    });
  }

  useEffect(()=>{
    if(params.q !== ''){
      fetchData();
    }
  }, [params])

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
                    spaceBetween={30}
                    slidesPerView={"auto"}
                    slidesPerGroup={4}
                    loop={true}
                    breakpoints={{
                      0:{
                        slidesPerView:1,
                      },
                      760:{
                        slidesPerView:2,
                      },
                      1280:{
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
              height:"100%", objectFit:'contain'}}></iframe>
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
