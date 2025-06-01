import React, { useState, useRef } from "react";
import axios from "axios";
import styled from 'styled-components';
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
import ScrollReveal from "scrollreveal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y,  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { keyframes } from 'styled-components';


const Title = styled.h1`
/* デスクトップ向けのスタイル */
@media (min-width: 1300px) {
  font-size:50px;
}
/* スマホ向けのスタイル */
@media (max-width: 1300px) {
  font-size:25px;
}
  font-family:'Roboto', sans-serif;
  color: #333;
`;



const Description = styled.p`
/* スマホ向けのスタイル */
@media (max-width: 1300px) {
  display: none;
}
  font-size: 16px;
  font-family:'Roboto', sans-serif;
  color: #777;
  margin: 8px;
  text-align: center;
`;




const Container = styled.div`

/* スマホ向けのスタイル */
@media (max-width: 1300px) {
  max-width: 80vw;
  margin: 0px auto;
  margin-top: 20px;
}
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  
  /* デスクトップ向けのスタイル */
@media (min-width: 1300px) {
  animation: ${props => props.isVisible ? ContainerFadeOut : ContainerFadeIn} ${props => props.isVisible ? "1s" : "2s"} forwards;
}

@media (max-width: 1300px) {
  animation: ${props => props.isVisible ? ContainerFadeOut : ContainerFadeIn} ${props => props.isVisible ? "0.5s" : "0.5s"} forwards;
}
`;

const ContainerFadeIn = keyframes`
0% {
  opacity: -7;
  // right: -100%;
}

50% {
  opacity: -7;
  // right: -100%;
}

100% {
  opacity: 1;
  // right: 0;
}
`;

const ContainerFadeOut = keyframes`
from {
  opacity: 1;
  // right: 0;
}
to {
  opacity: -2;
  // right: -100%;
  display: none;
}
`;

const Container2 = styled.div`

  /* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    // max-width: 55vw;
    max-width: 1040px;
    margin: 0px auto;
    margin-top: 80px;
    margin-bottom: 50px;
    padding: 50px;
    max-height: 100vh;
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 90vw;
    margin: 0px auto;
    margin-top: 20px;
    margin-bottom: 50px;
    padding-top: 30px;
    padding-bottom: 30px;
    max-height: 100vh;
    min-height: 80vh;
  }
  position: relative;
  border-radius: 30px;
  display: flex;
  align-items: top;
  justify-content: center;
  background: #fff;
`;


const Container3 = styled.div`
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    flex-direction: column;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container4 = styled.div`
  /* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    max-width: 1040px;
    padding: 50px;
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 90vw;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  border-radius: 30px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6); // 軽く透明な背景
`;


const Containerchar = styled.div`
  /* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    max-width: 1040px;
    padding: 50px;
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 90vw;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  border-radius: 30px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255 ,255, 255); // 軽く透明な背景
`;



const Container5 = styled.div`
/* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    max-width: 1040px;
    padding: 50px;
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 90vw;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 20px;
    margin-left: 20px;
  }
  border-radius: 30px;
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(5, 5, 5, 0.2); // 軽く透明な背景
`;

const Container6 = styled.div`
/* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    max-width: 1040px;
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 100vw;
  }
  border-radius: 30px;
  // max-width: 1300px;
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const Container7 = styled.div`
  /* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 80vw;
    margin: 0px auto;
    margin-top: 20px;
  }
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100vw;
  
`;



const ContainerSideBar = styled.div`
@media (min-width: 1300px) {
}
text-align: center;

/* スマホ向けのスタイル */
@media (max-width: 1300px) {

}
  width: 80%;
  background-color: #f8f4e6; /* サイドバーの背景色 */
  border-radius: 30px;
  margin: 0px auto;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2); /* サイドバーの影 */
  
`;




const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  text-transform: uppercase;
  color: #5b5b5b;
  cursor: pointer;
  transition: all 1000ms;
  overflow: hidden;
  z-index: 1;
  &:disabled {
    color: #848484;
    background-color: #bebebe;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    color: #333;
    transform: scale(1.1);
    outline: 1px solid #333;
    box-shadow: 4px 5px 17px -4px ${props => props.color};
  }
  &:not(:disabled)::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 0;
    width: 0;
    height: 100%;
    background-color: ${props => props.color};
    // background-color: #cff7e8;
    transform: skewX(45deg);
    z-index: -1;
    transition: width 1000ms;
  }
  &:not(:disabled):hover::before {
    width: 150%;
  }
`;


const ButtonSetting = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  text-transform: uppercase;
  color: #5b5b5b;
  cursor: pointer;
  transition: all 1000ms;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 3;

  &:disabled {
    color: #848484;
    background-color: #bebebe;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    color: #333;
    transform: scale(1.1);
    outline: 1px solid #333;
    box-shadow: 4px 5px 17px -4px ${props => props.color};
    // box-shadow: 4px 5px 17px -4px #268391;
  }
  &:not(:disabled)::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 0;
    width: 0;
    height: 100%;
    background-color: ${props => props.color};
    transform: skewX(45deg);
    z-index: -1;
    transition: width 1000ms;
  }
  &:not(:disabled):hover::before {
    width: 150%;
  }
`;

const Loading = styled.div`
  width: 40%;
  height: 4.8px;
  display: inline-block;
  background: #bebebe;
  position: relative;
  overflow: hidden;
  margin: 10px;

  &:after {
    content: '';
    width: 0%;
    height: 4.8px;
    background-color: ${props => props.color};
    font-size: 15px;
    background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.25) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.25) 75%, transparent 75%, transparent);
    // background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.25) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.25) 75%, transparent 75%, transparent);
    background-size: 1em 1em;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    animation: animFw ${props => props.time} ${props => props.acc} infinite,  barStripe 1s linear infinite;
  }
  @keyframes barStripe {
    0% {
      background-position: 1em 0;
    }
    100% {
      background-position: 0 0;
    }
  }
  
  @keyframes animFw {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;

const ZundamonImageMobile = styled.img`

/* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    display: none;
  }

/* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    {props => props.isVisible ? 'display: none;' : 'display: block;'}
  }

  max-height: 30vh;  // 必要に応じて画像のサイズを調整します
  animation: floatAnimation 2s infinite alternate;

  @keyframes floatAnimation {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-40px);
    }
  }
`;

const ZundamonImage = styled.img`

/* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 30vw;
    display: none;
  }
  // width: 600px;  // 必要に応じて画像のサイズを調整します
  width: 37%;
  height: 600px;
  animation: floatAnimation 2s infinite alternate;
  visibility: ${props => props.isVisible ? 'hidden' : 'visible'};

  @keyframes floatAnimation {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-40px);
    }
  }
`;

const ZundamonImageSetting = styled.img`

/* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 30vw;
    display: none;
  }
  // width: 600px;  // 必要に応じて画像のサイズを調整します
  width: 384;
  height: 600px;
  margin: 0 calc(50% - 135%);
  margin-top: 40px;
  position: absolute;

  animation: rotate 1s linear;
  animation-delay: 0.5s;
  animation-timing-function: ease;
  animation-fill-mode: both;
  // animation: ${props => props.isVisible ? reverseIn : reverseOut} forwards;
  animation: ${props => props.isVisible ? reverseIn : reverseOut} ${props => props.isVisible ? "1s" : "0.5s"} forwards;
  

`;

const reverseIn = keyframes`
0% {
  transform: rotateY(0deg);
  opacity: 1;
}
50% {
  transform: rotateY(90deg);
  opacity: 1;
}
100% {
  transform: rotateY(180deg);
  opacity: 0;
}
`;

const reverseOut = keyframes`
0% {
  transform: rotateY(180deg);
  opacity: 0;
}
50% {
  transform: rotateY(90deg);
  opacity: 1;
}
100% {
  transform: rotateY(0deg);
  opacity: 1;
}
`;


const ZundamonImageSetting2 = styled.img`

/* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 30vw;
    display: none;
  }
  // width: 600px;  // 必要に応じて画像のサイズを調整します
  width: 384;
  height: 600px;
  margin: 0 calc(50% - 135%);
  margin-top: 40px;
  position: absolute;

  animation: rotate2 1s linear;
  animation-delay: 0.5s;
  animation-timing-function: ease;
  animation-fill-mode: both;

  // animation: ${props => props.isVisible ? reverseIn2 : reverseOut2} forwards;
  animation: ${props => props.isVisible ? reverseIn2 : reverseOut2} ${props => props.isVisible ? "1s" : "0.5s"} forwards;
`;

const  reverseIn2 = keyframes`
0% {
  transform: rotateY(0);
  opacity: 0;
}
50% {
  transform: rotateY(90deg);
  opacity: 1;
}
100% {
  transform: rotateY(180deg);
  opacity: 1;
}
`;

const reverseOut2 = keyframes`
0% {
  transform: rotateY(0deg);
  opacity: 1;
}
50% {
  transform: rotateY(90deg);
  opacity: 1;
}
100% {
  transform: rotateY(180deg);
  opacity: 0;
}
`;

// キーフレームアニメーションの定義
const popInAnimation2 = keyframes`
  0% {
    opacity: 1;
    scale: 1;
  }

  50% {
    opacity: 1;
    scale: 1.2;
  }

  100% {
    opacity: 0;
    z-index: -1;
    scale: 1;
    display: none;
  }
`;

const TitleLogo = styled.img`
/* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    width: 50%;
  }
/* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    width: 70%;
  }
  margin:0 auto;
  display:block;
  width:70%;
  animation: ${popInAnimation2} 2s ease-out forwards;
  z-index: 6;
`;

const Images = styled.img`

/* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 20vw;
  }
  margin: 20px;
  max-height:20vh;
  // max-height: 300px;
  //丸める
  border-radius: 30%;
  display: block;
`;

const Images2 = styled.img`
/* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    max-width: 1040px;
  }
/* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 95vw;
  }
  // display: block;
`;


const ZundamonImageSelif = styled.img`

  /* スマホ向けのスタイル */
    @media (max-width: 1300px) {
      max-width: 30vw;
      // display: none;
  }
  max-width: 300px;  // 必要に応じて画像のサイズを調整します
  animation: floatAnimation 2s infinite alternate;

  @keyframes floatAnimation {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
`;

const KiritanImageSelif = styled.img`

  /* スマホ向けのスタイル */
    @media (max-width: 1300px) {
      max-width: 30vw;
      // display: none;
  }
 
  max-width: 300px;  // 必要に応じて画像のサイズを調整します
  transform: scale(-1, 1);
  animation: floatAnimation 2s infinite alternate;



  @keyframes floatAnimation {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
`;


const ZundamonImageSelif2 = styled.img`

  /* スマホ向けのスタイル */
    @media (max-width: 1300px) {
      max-width: 30vw;
      // display: none;
  }
  max-width: 300px;  // 必要に応じて画像のサイズを調整します
  animation: move 6s infinite ;
  animation-delay: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  @keyframes move {
    0%, 100% { left: 0; transform: rotateY(0);  }
    50% { left: 100%; transform: rotateY(180deg); }
  }


  

  
  }
`;


const StyledHeader = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
  text-align: center;
  color: #333;
  // border-bottom: 2px solid #333;
  padding-bottom: 8px;
  margin-bottom: 20px;
`;

const StyledParagraph = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #555;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto; // センタリング
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 軽い影
`;

const SelifParagraph = styled(StyledParagraph)`
/* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    width: 400px;
    padding-right: 40px; // 吹き出しの部分のスペースを確保
    &:after {
      content: "";
      position: absolute;
      top: 20%;
      right: -20px; // 三角形のベースの位置
      transform: translateY(-50%);
      border-left: 20px solid rgba(255, 255, 255, 0.9); // 吹き出しの背景色である白色を指定
      border-top: 0px solid transparent;
      border-bottom: 20px solid transparent;
    }
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 70vw;
    margin-right: 10px;
    margin-left: 10px;
    &:after {
      content: "";
      position: absolute;
      top: 20%;
    }
  }
  position: relative;
  margin : 50;
`;

const SelifParagraphKiritan = styled(StyledParagraph)`
/* デスクトップ向けのスタイル */
  @media (min-width: 1300px) {
    width: 400px;
    padding-left: 40px; // 吹き出しの部分のスペースを確保
    &:after {
      content: "";
      position: absolute;
      top: 20%;
      left: -20px; // 三角形のベースの位置
      transform: translateY(-50%);
      border-right: 20px solid rgba(255, 255, 255, 0.9); // 吹き出しの背景色である白色を指定
      border-top: 0px solid transparent;
      border-bottom: 20px solid transparent;
    }
  }
  /* スマホ向けのスタイル */
  @media (max-width: 1300px) {
    max-width: 70vw;
    margin-right: 10px;
    margin-left: 10px;
    &:after {
      content: "";
      position: absolute;
      top: 20%;
    }
  }
  position: relative;
  margin : 50;
`;

// キーフレームアニメーションの定義
const popInAnimation = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  100% {
    z-index: -1;
    display: none;
  }
`;

// Styled Componentで背景画像とアニメーションを適用
const OpeningAnimation = styled.div`
  width: 100%; // 必要に応じて調整
  height: 100%; // 必要に応じて調整
  //スクロールできないように
  position: fixed;
  top: 0;
  left: 0;
  background-color: #cff7e8;
  animation: ${popInAnimation} 2s ease-out forwards;
  z-index: 6;
  display: flex;
  align-items: center;
`;


const FadeInSection = styled.div`
  transform: translateY(${props => (props.isVisible ? '0' : '50px')});
  opacity: ${props => (props.isVisible ? '1' : '0')};
  transition: transform 1s, opacity 1s;
`;

const FadeInSection2 = styled.div`
  transform: translateY(${props => (props.isVisible ? '0' : '50px')});
  opacity: ${props => (props.isVisible ? '1' : '0')};
  transition: transform 1s, opacity 1s;
`;

const slideIn = keyframes`
  from {
    opacity: -2;
    right: -100%;
  }
  to {
    opacity: 1;
    right: 0;
  }
`;

const slideOut = keyframes`
  0% {
    opacity: 1;
    right: 0;
  }
  50% {
    opacity: 1;
    right: 0;
  }
  100% {
    opacity: -2;
    right: -100%;
  }
`;

const Sidebar = styled.div`
  position: absolute;
  border-radius: 30px;
  top: 0;
  right: -100%; 
  // width: 300px; /* サイドバーの幅 */
  width:50%;
  height: 100%; /* サイドバーの高さ */
  background-color: #fffff9; /* サイドバーの背景色 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* サイドバーの影 */
  z-index: 2;

  //デスクトップ版のスタイル
  @media (min-width: 1300px) {
    animation: ${props => props.isVisible ? slideIn : slideOut} ${props => props.isVisible ? "0.5s" : "1.5s"} forwards;
  }
  

  // スマホ版のスタイル
  @media (max-width: 1300px) {
    animation: ${props => props.isVisible ? slideIn : slideOut} 0.1s forwards;
    width: 100%;
    height: 100%;
  }
`;


const ShutdownOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const NoticeBox = styled.div`
  text-align: center;
  color: #ffffff;
  padding: 40px 60px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
`;

const NoticeTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const NoticeText = styled.p`
  font-size: 20px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const NoticeLink = styled.a`
  display: inline-block;
  background: #38b2ac;
  font-size: 24px;
  color: #ffffff;
  padding: 24px 60px;
  border-radius: 30px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s ease;
  &:hover {
    background: #2c7a7b;
  }
`;

class TtsQuestV3Voicevox extends Audio {
  constructor(speakerId, text, ttsQuestApiKey) {
    super();
    var params = {};
    params['key'] = ttsQuestApiKey;
    params['speaker'] = speakerId;
    params['text'] = text;
    const query = new URLSearchParams(params);
    this.#main(this, query);
  }
  #main(owner, query) {
    if (owner.src.length>0) return;
    var apiUrl = 'https://api.tts.quest/v3/voicevox/synthesis';
    fetch(apiUrl + '?' + query.toString())
    .then(response => response.json())
    .then(response => {
      if (typeof response.retryAfter !== 'undefined') {
        setTimeout(owner.#main, 1000*(1+response.retryAfter), owner, query);
      }
      else if (typeof response.mp3StreamingUrl !== 'undefined') {
        owner.src = response.mp3StreamingUrl;
      }
      else if (typeof response.errorMessage !== 'undefined') {
        throw new Error(response.errorMessage);
      }
      else {
        throw new Error("serverError");
      }
    });
  }
}


const App = () => {
  const [recording, setRecording] = useState(false);
  const [frist, setFrist] = useState(true);
  const [audioData, setAudioData] = useState(null);
  const [audioDatas, setAudioDatas] = useState(null);
  const [noiseAudio, setNoiseAudio] = useState(null);
  const [noiseAudioUrl, setNoiseAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [sagemakerAudio, setSagemakerAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(6);
  const [selectchar, setselectchar] = useState(0);
  const [pagechange, setpagechange] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("man");
  const [selectedOptiongpu, setSelectedOptiongpu] = useState("gpuoff");
  const [selectedOptionvox, setSelectedOptionvox] = useState("voxoff");
  const [selectedOptionnoise, setSelectedOptionnoise] = useState("noiseoff");
  const [text, setText] = useState("")
  const countdownIntervalRef = useRef(); // setIntervalのIDを保存するためのref
  const countdownTimeoutRef = useRef();  // setTimeoutのIDを保存するためのref
  const [isContainerVisible, setContainerVisible] = useState(false);
  const [secondnum , setSecondnum] = useState(4);
  const [showNotice, setShowNotice] = useState(false);
  console.log(pagechange)

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

    /* ★ 追加: OpeningAnimation 終了後に 2.5 秒でオーバーレイ表示 */
    React.useEffect(() => {
      const timer = setTimeout(() => setShowNotice(true), 1900);
      return () => clearTimeout(timer);
    }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionChangegpu = (event) => {
    setSelectedOptiongpu(event.target.value);
    if(event.target.value === "gpuon"){
      setSecondnum(50)
    }else
    {
      setSecondnum(4)
    }
  };

  const handleOptionChangevox = (event) => {
    setSelectedOptionvox(event.target.value);
  };

  const handleOptionChangenoise = (event) => {
    setSelectedOptionnoise(event.target.value);
  };

  
  const [backgroundColor, setBackgroundColor] = useState('#cff7e8');
  const [buttonColor, setButtonColor] = useState('#cff7e8');

  // 指定された色に背景色を変更する関数
  const changeBackgroundColor = (newColor) => {
    setBackgroundColor(newColor);
    setButtonColor(newColor);
  };

  // バックグラウンドスタイル
  const backgroundStyle = {
    transition: 'background-color 1s ease', // 1秒かけて背景色が変わる
    backgroundColor: backgroundColor, // 現在の背景色
    height: '100%', // 画面全体をカバー
    width: '100%',
    position: "relative",
    top: 0,
    left: 0,
    overflow:"hidden"
  };

 //inputスタイル
  const inputStyle = {
   align: "center",
   margin: "10px",
  };

  //charスタイル
  const charStyle = {
    display: "flex",
    justifyContent: "center",
  };

  // コンポーネントがマウントされた後、特定の色に変更

  const AudioButton = (props) => {
    // オーディオと再生状態を管理するための状態
    const [audio] = useState(new Audio(props.audio));
    const [isPlaying, setIsPlaying] = useState(false);
  
    // ボタンをクリックしたときの動作
    const togglePlay = () => {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying); // 状態を反転させる
    };

    // オーディオが終了したときのイベントリスナーをセットアップ
    React.useEffect(() => {
      const handleAudioEnd = () => setIsPlaying(false);
      audio.addEventListener('ended', handleAudioEnd);
      // クリーンアップ関数
      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
      };
    }, [audio]);

  
    return (
      <button onClick={togglePlay} className="audio-button" style={{'background-color': props.color, 'margin': 0, 'marginLeft': 10 }}>
      {/* <button onClick={togglePlay} className="audio-button" style={{'background-color': props.color}}> */}
        {isPlaying ? '■' : '▶'}
      </button>
    );
  };

  const AudioButtonDL = (props) => {
    // オーディオと再生状態を管理するための状態
    
    const togglePlay = () => {
      if(props.selif === "") return;
      const audio = new TtsQuestV3Voicevox(props.dokuid, props.selif, "w58_55m7T_e_110");
      audio.play();
      setText("")
    };

    

    return (
      <button onClick={togglePlay} className="audio-button2" style={{'background-color': props.color}}>
        ▶
      </button>
    );
  };

  const toggleSidebar = () => {
    setContainerVisible(!isContainerVisible);
    setpagechange(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position > 100) { // 例: 100pxスクロールしたら表示
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  React.useEffect(() => {
    const handleScroll2 = () => {
      const position = window.scrollY;
      if (position > 700) { // 例: 100pxスクロールしたら表示
        setIsVisible2(true);
      } else {
        setIsVisible2(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll2);
  
    return () => {
      window.removeEventListener('scroll', handleScroll2);
    };
  }, []);

  
  const Scroll = ({ children }) => {

    const sectionRef = useRef();
    React.useEffect(() => {
      if (sectionRef.current) {
        ScrollReveal().reveal(sectionRef.current, {
          reset: true,
          delay: 200,
          opacity: 0,
          distance: "40px",
          viewFactor: 0.36,
        });
      }
    },[]);
  
    return (<section ref={sectionRef}>{children}</section>)
  }

  const ScrollScale = ({ children }) => {

    const sectionRef = useRef();
    React.useEffect(() => {
      if (sectionRef.current) {
        ScrollReveal().reveal(sectionRef.current, {
          reset: true,
          delay: 70,
          scale: 0.5,
          opacity: 0,
          distance: "40px",
          viewFactor: 0.36,
        });
      }
    },[]);
  
    return (<section ref={sectionRef}>{children}</section>)
  }

  const handleStartRecording = async () => {
    //二回目以降の録音のために初期化
    if(frist === true){
      await register(await connect());
    }
    resetTranscript();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream , { mimeType: 'audio/wav' });
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    if(selectedOptionvox === "voxon"){
    SpeechRecognition.startListening({ continuous: true });
    }
    mediaRecorderRef.current.onstop = async () => {
      
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setAudioData(URL.createObjectURL(audioBlob));
      setAudioDatas(audioBlob);
    };

    audioChunksRef.current = [];
    mediaRecorderRef.current.start();
    setRecording(true);
    console.log(selectedOption);
    
    setCountdown(secondnum); // カウントダウンをリセット
    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // 6秒後に録音を自動的に停止する
    countdownTimeoutRef.current = setTimeout(() => {
      if(selectedOptionvox === "voxon"){
      SpeechRecognition.stopListening();
      setText(transcript);
      }
      handleStopRecording();
    }, secondnum * 1000);
  };

  const handleStopRecording = () => {
    if(selectedOptionvox === "voxon"){
    SpeechRecognition.stopListening();
    }
    clearInterval(countdownIntervalRef.current);
    clearTimeout(countdownTimeoutRef.current);
    setFrist(false);
    mediaRecorderRef.current.stop();
    setRecording(false);
    
  };

  const getCharName = (selectchar) => {
    switch (selectchar) {
      case 1:
        return "zunda";
      case 2:
        return "metan";
      case 0:
        return "kiritan";
      default:
        return "zunda";
    }
  };

  const getCharName2 = (selectchar) => {
    const randomint = Math.floor( Math.random() * 2 ) ;
    console.log(randomint);
    switch (selectchar) {
      case "gpuon":
        return "https://t3o2ikhypd.execute-api.ap-southeast-2.amazonaws.com/zundagpu";
        // if(randomint === 0){
        //   return "4://6kpyevi158.execute-api.ap-southeast-2.amazonaws.com/tgpu";
        // }
        // else if(randomint === 1){
        //   return "https://t3o2ikhypd.execute-api.ap-southeast-2.amazonaws.com/zundagpu";
        // }
        // return "error";
      case "gpuoff":
        return "https://k62bbvqpe4.execute-api.ap-northeast-1.amazonaws.com/dev";
        // if(randomint === 0){
        //   return "https://k62bbvqpe4.execute-api.ap-northeast-1.amazonaws.com/dev";
        // }
        // else if(randomint === 1){
        //   return "https://4a3u64uxe8.execute-api.ap-southeast-2.amazonaws.com/hey";
        // }
        // return "error";
        
      default:
        return "error";
    }
  }


  const handleSendToAPIGateway = async () => {
    if (audioData) {
      setLoading(true); 
      const charname = getCharName(selectchar);
      console.log(charname);
      const formData = new FormData();

      if(noiseAudio){
      formData.append('audio', noiseAudio); // 'audio' はバックエンドでの受け取りキーと一致する必要があります
      }else{
      formData.append('audio', audioDatas); // 'audio' はバックエンドでの受け取りキーと一致する必要があります
      }
      
        // FileReaderを使用してオーディオデータをBase64にエンコード
      const reader = new FileReader();
      if(noiseAudio){
        reader.readAsDataURL(noiseAudio); // audioDatasはBlobまたはFileオブジェクト
      }
      else{
      reader.readAsDataURL(audioDatas); // audioDatasはBlobまたはFileオブジェクト
      }
      reader.onloadend = async () => {
        const base64Audio = reader.result;
        const audio2 = base64Audio.split(",")[1];
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "audio/wav",
            },
            responseType: 'blob',
        };

            // 性別とモデル名をJSONオブジェクトとして追加
      
      const additionalData = {
        gender: selectedOption, // または適切な変数
        modelName: charname, // モデル名を指定
        audioDataa: audio2,
      };

        try {
            
              const apiurl = getCharName2(selectedOptiongpu);
              const response = await axios.post(apiurl, additionalData, config);
              const audioURL = URL.createObjectURL(response.data);
              setSagemakerAudio(audioURL);
          
        } catch (error) {
            console.error("Error sending data to API Gateway:", error);
        } finally {
            setLoading(false);
        }

        reader.onerror = () => {
          console.error("Error reading audio file");
          setLoading(false);
      };
    }
    }
};


const handleSendToAPIGatewayNoise = async () => {
  if (audioData) {
    setLoading(true); 
    const charname = getCharName(selectchar);
    console.log(charname);
    const formData = new FormData();
    formData.append('audio', audioDatas); // 'audio' はバックエンドでの受け取りキーと一致する必要があります
      // FileReaderを使用してオーディオデータをBase64にエンコード
    const reader = new FileReader();
    reader.readAsDataURL(audioDatas); // audioDatasはBlobまたはFileオブジェクト
    reader.onloadend = async () => {
      const base64Audio = reader.result;
      const audio2 = base64Audio.split(",")[1];
      const config = {
          headers: {
              "Content-Type": "application/json",
              "Accept": "audio/wav",
          },
          responseType: 'blob',
      };
      
    // 性別とモデル名をJSONオブジェクトとして追加
    
    const additionalData = {
      gender: selectedOption, // または適切な変数
      modelName: charname, // モデル名を指定
      audioDataa: audio2,
    };

      try {
        
            const response = await axios.post("https://6kpyevi158.execute-api.ap-southeast-2.amazonaws.com/tnoise", additionalData, config);
            const audioURL = URL.createObjectURL(response.data);
            setNoiseAudio(response.data);
            setNoiseAudioUrl(audioURL);
            console.log(audioURL);
      } catch (error) {
          console.error("Error sending data to API Gateway:", error);
      } finally {
          setLoading(false);
      }

      reader.onerror = () => {
        console.error("Error reading audio file");
        setLoading(false);
    };
  }
  }
};

    const {
      transcript,
      resetTranscript,
    } = useSpeechRecognition();
  

return (
  <>

        {/* タイトルロゴのオープニングアニメ */}
        <OpeningAnimation>
        <img
          src="/logo_transparent.png"
          alt="Logo"
          style={{ margin: "0 auto", display: "block", width: "70%" }}
        />
      </OpeningAnimation>

      {/* ★ サービス停止のお知らせオーバーレイ */}
      {showNotice && (
        <ShutdownOverlay>
          <NoticeBox>
            <NoticeTitle>サービス提供終了のお知らせ</NoticeTitle>
            <NoticeText>
              本サービスは現在ご利用いただけません。後継サイトをご利用ください。
            </NoticeText>
            <NoticeLink
              href="https://narouyo-tsukuyomi-chan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              後継サイトへ移動
            </NoticeLink>
          </NoticeBox>
        </ShutdownOverlay>
      )}

      
  <OpeningAnimation>
    <TitleLogo src="/logo_transparent.png" alt="Logo"/>
  {/* <img src="/logo_transparent.png" alt="Logo" style={{"margin":"0 auto", "display":"block", "width":"70%"}}/> */}
  </OpeningAnimation>



  <div style={backgroundStyle}>
  <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      initialSlide={1}
      navigation={isContainerVisible ? false : true}
      loop={false}
      realIndex
      noSwiping = "input"
      pagination={{ clickable: true}}
      threshold={isContainerVisible ? 1000000 : 10}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={(swiper) => {
        // console.log(swiper.realIndex)
        setselectchar(swiper.realIndex)
        setpagechange(true)
        //ずんだもん
        if(swiper.realIndex === 1)
          changeBackgroundColor('#cff7e8');
        //めたん
        else if(swiper.realIndex === 2)
          changeBackgroundColor('#eebbcb');
        //きりたん
        else if(swiper.realIndex === 0)
          changeBackgroundColor('#b28c6e');
        
      }}
    >
      <SwiperSlide>
        {/* <MainPage name="きりたん" png="/kiritan.png" png_r="/kiritan_recording.png" png_s = "/kiritan_server.png"></MainPage> */}

        <Container2>

<ButtonSetting color={buttonColor} disabled={recording || loading} onClick = {toggleSidebar} >詳細設定</ButtonSetting>
 {pagechange === false && <Sidebar isVisible={isContainerVisible}>

  <ZundamonImageSetting isVisible={isContainerVisible} src="kiritan.png" alt="きりたん"/>
  <ZundamonImageSetting2 isVisible={isContainerVisible} src="kiritan_recording.png" alt="きりたん" />

    {/* サイドバーの内容 */}

    <Title style={{"text-align":"center" }}>詳細設定</Title>

    <ContainerSideBar> 
    <h2 style={{"text-align":"center" }}>ユーザーの性別</h2>
    <div className="mydict" >  

<div>
  <label>
    <input type="radio" name="きりたん"value="man" onChange={handleOptionChange} checked={selectedOption === 'man'} />
    <span>男性</span>
  </label>
  <label>
    <input type="radio" name="きりたん"value="woman" onChange={handleOptionChange} checked={selectedOption === 'woman'}/>
    <span>女性</span>
  </label>
</div>
</div>
</ContainerSideBar>


<ContainerSideBar> 
    <h2 style={{"text-align":"center" }}>GPU推論</h2>
    <div className="mydict" >  

<div>
  <label>
    <input type="radio" name={"きりたんgpu"} value="gpuon" onChange={handleOptionChangegpu} checked={selectedOptiongpu === 'gpuon'} />
    <span>ON</span>
  </label>
  <label>
    <input type="radio" name={"きりたんgpu"} value="gpuoff" onChange={handleOptionChangegpu} checked={selectedOptiongpu === 'gpuoff'}/>
    <span>OFF</span>
  </label>
</div>
</div>
</ContainerSideBar>

<ContainerSideBar> 
    <h2 style={{"text-align":"center" }}>音声認識　VOICEVOX</h2>
    <div className="mydict" >  

<div>
  <label>
    <input type="radio" name={"きりたんvox"} value="voxon" onChange={handleOptionChangevox} checked={selectedOptionvox === 'voxon'} />
    <span>ON</span>
  </label>
  <label>
    <input type="radio" name={"きりたんvox"} value="voxoff" onChange={handleOptionChangevox} checked={selectedOptionvox === 'voxoff'}/>
    <span>OFF</span>
  </label>
</div>
</div>
</ContainerSideBar>


<ContainerSideBar> 
    <h2 style={{"text-align":"center" }}>ノイズキャンセリング</h2>
    <div className="mydict" >  

<div>
  <label>
    <input type="radio" name={"きりたんnoise"} value="noiseon" onChange={handleOptionChangenoise} checked={selectedOptionnoise === 'noiseon'} />
    <span>ON</span>
  </label>
  <label>
    <input type="radio" name={"きりたんnoise"} value="noiseoff" onChange={handleOptionChangenoise} checked={selectedOptionnoise === 'noiseoff'}/>
    <span>OFF</span>
  </label>
</div>
</div>
</ContainerSideBar>

</Sidebar>}


{   
<Container isVisible={isContainerVisible}>
<link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap" rel="stylesheet"></link>

<Title style={{"margin-bottom" : "8px" }}>AIきりたん</Title>
{!recording && !loading && <ZundamonImageMobile src="/kiritan.png" alt="きりたん"/>}
{recording && !loading && <ZundamonImageMobile  src="/kiritan_recording.png"  alt="きりたん"/>}
{!recording && loading && <ZundamonImageMobile  src="/kiritan_server.png" alt="きりたん"/>}

  <Description>
    録音ボタンをクリックして録音を開始 
  </Description>
  <Description>
    停止ボタンをクリックして録音を停止
  </Description>     
  <Description>
    その後、サーバーへ送信してAIきりたんになってください。
  </Description>


  <Container3>
  <Button onClick={handleStartRecording} disabled={recording} color={buttonColor}>
      録音ボタン 
  </Button>

  <Button onClick={handleStopRecording} disabled={!recording} color={buttonColor}>
      録音停止ボタン
  </Button>
{ selectedOptionnoise === "noiseon" &&
  <Button disabled={!audioData || loading} onClick={handleSendToAPIGatewayNoise} color={buttonColor}>
      AIノイズキャンセリング
  </Button>}

  <Button disabled={!audioData || loading} onClick={handleSendToAPIGateway} color={buttonColor}>
      AIできりたん
  </Button>

  </Container3>

  {recording && selectedOptiongpu==="gpuoff" &&<Loading color={buttonColor} time={"4s"} acc={"linear"}></Loading >}
  {recording && selectedOptiongpu==="gpuon" &&<Loading color={buttonColor} time={"50s"} acc={"linear"}></Loading >}
  {recording && <div>残り時間: {countdown}秒</div>}

  {loading && <Loading color={buttonColor} time={"30s"} acc={"ease"}></Loading >}

  {audioData && <audio src={audioData} controls style={{"margin-bottom":"8px"}} />}

  {noiseAudio && (
      <div>
          <audio src={noiseAudioUrl} controls style={{"margin-bottom":"8px"}} />
      </div>
  )}

  {sagemakerAudio && (
      <div>
          <audio src={sagemakerAudio} controls controlslist="nodownload" style={{"margin-bottom":"8px"}}/>
      </div>
  )}

</Container>
}

{!recording && !loading &&  <ZundamonImage isVisible={isContainerVisible} src="/kiritan.png" alt="きりたん" />}
{recording && !loading &&<ZundamonImage isVisible={isContainerVisible} src="/kiritan_recording.png" alt="きりたん" />}
{!recording && loading && <ZundamonImage isVisible={isContainerVisible} src="/kiritan_server.png" alt="きりたん" />}

</Container2>

        <FadeInSection isVisible={isVisible}>

        <Containerchar>
        <ZundamonImageSelif2 src="/kiritanmon.png" alt="Zundamon" />
          <Container7>
              <div className="mydict" style={charStyle}>
            <Title>東北きりたん</Title>
            <AudioButton audio="/kiritan1.wav" color="#8d6449"></AudioButton>
            </div>
              <h3>東北地方応援キャラ、東北ずん子の関連キャラクター。<br></br>
                きりたんぽがモチーフとなっており、背中に「きりたん砲」を背負っている。<br></br>
                もともとが<a href="https://www.ah-soft.com/voiceroid/" target="_blank" rel="noreferrer" >VOICEROID</a>出身なので、YouTube等では、知名度が高い。<br></br>
                大人の都合で、文字を音声にこのサイトでは変換できないが、サンプルボイスを聞くことができる。丁寧語で話す。
              </h3>

          </Container7>
        
      </Containerchar>
      </FadeInSection>
      </SwiperSlide>

      <SwiperSlide>
      {/* <MainPage name="ずんだもん" png="/zunda.png" png_r="/zunda_recording.png" png_s="/zunda_server.png" color="" dokuid={3}></MainPage>    */}
      <Container2>

      <ButtonSetting color={buttonColor} disabled={recording || loading} onClick = {toggleSidebar} >詳細設定</ButtonSetting>
        {pagechange === false && <Sidebar isVisible={isContainerVisible}>

        {/* <ImageSetting isVisible={isContainerVisible} png="zunda.png" png2="zunda_yubisasi.png" name="ずんだもん"/> */}
        <ZundamonImageSetting isVisible={isContainerVisible} src="zunda.png" alt="ずんだもん"/>
        <ZundamonImageSetting2 isVisible={isContainerVisible} src="zunda_yubisasi.png" alt="ずんだもん" />
      
          {/* サイドバーの内容 */}
      
          <Title style={{"text-align":"center" }}>詳細設定</Title>

          <ContainerSideBar> 
          <h2 style={{"text-align":"center" }}>ユーザーの性別</h2>
          <div className="mydict" >  

      <div>
        <label>
          <input type="radio" name="ずんだもん"value="man" onChange={handleOptionChange} checked={selectedOption === 'man'} />
          <span>男性</span>
        </label>
        <label>
          <input type="radio" name="ずんだもん"value="woman" onChange={handleOptionChange} checked={selectedOption === 'woman'}/>
          <span>女性</span>
        </label>
      </div>
    </div>
    </ContainerSideBar>


    <ContainerSideBar> 
          <h2 style={{"text-align":"center" }}>GPU推論</h2>
          <div className="mydict" >  

      <div>
        <label>
          <input type="radio" name={"ずんだもんgpu"} value="gpuon" onChange={handleOptionChangegpu} checked={selectedOptiongpu === 'gpuon'} />
          <span>ON</span>
        </label>
        <label>
          <input type="radio" name={"ずんだもんgpu"} value="gpuoff" onChange={handleOptionChangegpu} checked={selectedOptiongpu === 'gpuoff'}/>
          <span>OFF</span>
        </label>
      </div>
    </div>
    </ContainerSideBar>

    <ContainerSideBar> 
          <h2 style={{"text-align":"center" }}>音声認識　VOICEVOX</h2>
          <div className="mydict" >  

      <div>
        <label>
          <input type="radio" name={"ずんだもんvox"} value="voxon" onChange={handleOptionChangevox} checked={selectedOptionvox === 'voxon'} />
          <span>ON</span>
        </label>
        <label>
          <input type="radio" name={"ずんだもんvox"} value="voxoff" onChange={handleOptionChangevox} checked={selectedOptionvox === 'voxoff'}/>
          <span>OFF</span>
        </label>
      </div>
    </div>
    </ContainerSideBar>


    <ContainerSideBar> 
          <h2 style={{"text-align":"center" }}>ノイズキャンセリング</h2>
          <div className="mydict" >  

      <div>
        <label>
          <input type="radio" name={"ずんだもんnoise"} value="noiseon" onChange={handleOptionChangenoise} checked={selectedOptionnoise === 'noiseon'} />
          <span>ON</span>
        </label>
        <label>
          <input type="radio" name={"ずんだもんnoise"} value="noiseoff" onChange={handleOptionChangenoise} checked={selectedOptionnoise === 'noiseoff'}/>
          <span>OFF</span>
        </label>
      </div>
    </div>
    </ContainerSideBar>

    </Sidebar>}

  
  {   
  <Container isVisible={isContainerVisible}>
    <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap" rel="stylesheet"></link>

    <Title style={{"margin-bottom" : "8px" }}>AIずんだもん</Title>
    {!recording && !loading && <ZundamonImageMobile src="/zunda.png" alt="ずんだもん"/>}
    {recording && !loading && <ZundamonImageMobile  src="/zunda_recording.png"  alt="ずんだもん"/>}
    {!recording && loading && <ZundamonImageMobile  src="/zunda_server.png" alt="ずんだもん"/>}
        <Description>
          録音ボタンをクリックして録音を開始 
        </Description>
        <Description>
          停止ボタンをクリックして録音を停止
        </Description>     
        <Description>
          その後、サーバーへ送信してAIずんだもんになってください。
        </Description>
    {transcript !== "" &&     
    <Container3 style={{
    "backgroundColor": "#ebf6f7", 
    "borderRadius": "5%",
    "color": "#696969", 
    // "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)", // 豊かな影をつける
    "fontFamily": "'M PLUS Rounded 1c', sans-serif",
    "fontSize": "1.2em", 
    "fontWeight": "bold", 
    "letterSpacing": "0.05em",
    "display": "flex", 
    "alignItems": "center", 
    "justifyContent": "center", 
    "textTransform": "uppercase",
    padding: "10px",
    "margin": "10px", 
    "transition": "transform 0.2s ease-in-out", // ホバー時の滑らかな変化を追加
    position: "relative", // 吹き出しの尾のための相対位置設定
  }}>
    
    
    <p style={{ marginLeft:"10px",marginRight:"10px",marginBottom: "10px", marginTop: "10px" }}>{transcript}</p>
    {transcript !== "" && <AudioButtonDL style={{ marginBottom: "10px",marginTop: "10px" }} color="" dokuid={3} selif={transcript} ></AudioButtonDL>}
    </Container3> }

        <Container3>
        <Button onClick={handleStartRecording} disabled={recording} color={buttonColor}>
            録音ボタン 
        </Button>

        <Button onClick={handleStopRecording} disabled={!recording} color={buttonColor}>
            録音停止ボタン
        </Button>
    { selectedOptionnoise === "noiseon" &&
        <Button disabled={!audioData || loading} onClick={handleSendToAPIGatewayNoise} color={buttonColor}>
            AIノイズキャンセリング
        </Button>}

        <Button disabled={!audioData || loading} onClick={handleSendToAPIGateway} color={buttonColor}>
            AIでずんだもん
        </Button>
  
        </Container3>
        
        {recording && selectedOptiongpu==="gpuoff" &&<Loading color={buttonColor} time={"4s"} acc={"linear"}></Loading >}
        {recording && selectedOptiongpu==="gpuon" &&<Loading color={buttonColor} time={"50s"} acc={"linear"}></Loading >}

        {recording && <div>残り時間: {countdown}秒</div>}

        {loading && <Loading color={buttonColor} time={"30s"} acc={"ease"}></Loading >}

        {audioData && <audio src={audioData} controls style={{"margin-bottom":"8px"}} />}

        {noiseAudio && (
            <div>
                <audio src={noiseAudioUrl} controls style={{"margin-bottom":"8px"}} />
            </div>
        )}

        {sagemakerAudio && (
            <div>
                <audio src={sagemakerAudio} controls controlslist="nodownload" style={{"margin-bottom":"8px"}}/>
            </div>
        )}

  </Container>
  }
    
    {!recording && !loading &&  <ZundamonImage isVisible={isContainerVisible} src="/zunda.png" alt="ずんだもん" />}
    {recording && !loading &&<ZundamonImage isVisible={isContainerVisible} src="/zunda_recording.png" alt="ずんだもん" />}
    {!recording && loading && <ZundamonImage isVisible={isContainerVisible} src="/zunda_server.png" alt="ずんだもん" />}

</Container2>





        <FadeInSection isVisible={isVisible}>
        <Containerchar>
        <ZundamonImageSelif src="/zunda.GIF" alt="Zundamon" />
          <Container7> 
            
              <div className="mydict" style={charStyle}>
            <Title>ずんだもん</Title>
            <AudioButton audio="/zunda2.wav"></AudioButton>
            </div>
              <h3>ずんだ餅の精。やや不幸属性が備わっており、ないがしろにされることもしばしば。<br></br>
                最近はYouTubeでよく見かけるようになった。語尾に「～なのだ」をつける。<br></br>
                もともとは、無料音声合成ソフト<a href="https://voicevox.hiroshiba.jp/" target="_blank" rel="noreferrer">VOICEVOX</a>のキャラであり、文字を音声に変換する。
              </h3>
              <Container3>
              <input style={inputStyle} placeholder="セリフを入力"  className="input" value ={text} 
              onChange={(event) => setText(event.target.value)} 
              />
              <AudioButtonDL selif = {text}  dokuid={3} ></AudioButtonDL>
              </Container3>
          </Container7>
        
      </Containerchar>
      </FadeInSection>
      </SwiperSlide>

      <SwiperSlide>
        {/* <MainPage name="めたん" png="/metan.png" png_r="/metan_recording.png" png_s = "/metan_server.png"  color2 ="#ee827c" dokuid={2}></MainPage> */}
<Container2>

<ButtonSetting color={buttonColor} disabled={recording || loading} onClick = {toggleSidebar} >詳細設定</ButtonSetting>
{pagechange === false && <Sidebar isVisible={isContainerVisible}>

  <ZundamonImageSetting isVisible={isContainerVisible} src="metan.png" alt="めたん"/>
  <ZundamonImageSetting2 isVisible={isContainerVisible} src="metan_recording.png" alt="めたん" />

    {/* サイドバーの内容 */}

    <Title style={{"text-align":"center" }}>詳細設定</Title>

    <ContainerSideBar>
    <h2 style={{"text-align":"center" }}>ユーザーの性別</h2>
    <div className="mydict" >

<div>
  <label>
    <input type="radio" name="めたん"value="man" onChange={handleOptionChange} checked={selectedOption === 'man'} />
    <span>男性</span>
  </label>
  <label>
    <input type="radio" name="めたん"value="woman" onChange={handleOptionChange} checked={selectedOption === 'woman'}/>
    <span>女性</span>
  </label>
</div>
</div>
</ContainerSideBar>


<ContainerSideBar>  
    <h2 style={{"text-align":"center" }}>GPU推論</h2>
    <div className="mydict" >  

<div>
  <label>
    <input type="radio" name={"めたんgpu"} value="gpuon" onChange={handleOptionChangegpu} checked={selectedOptiongpu === 'gpuon'} />
    <span>ON</span>
  </label>
  <label>
    <input type="radio" name={"めたんgpu"} value="gpuoff" onChange={handleOptionChangegpu} checked={selectedOptiongpu === 'gpuoff'}/>
    <span>OFF</span>
  </label>
</div>
</div>
</ContainerSideBar>

<ContainerSideBar> 
    <h2 style={{"text-align":"center" }}>音声認識　VOICEVOX</h2>
    <div className="mydict" >  

<div>
  <label>
    <input type="radio" name={"めたんvox"} value="voxon" onChange={handleOptionChangevox} checked={selectedOptionvox === 'voxon'} />
    <span>ON</span>
  </label>
  <label>
    <input type="radio" name={"めたんvox"} value="voxoff" onChange={handleOptionChangevox} checked={selectedOptionvox === 'voxoff'}/>
    <span>OFF</span>
  </label>
</div>
</div>
</ContainerSideBar>


<ContainerSideBar> 
    <h2 style={{"text-align":"center" }}>ノイズキャンセリング</h2>
    <div className="mydict" >  

<div>
  <label>
    <input type="radio" name={"めたんnoise"} value="noiseon" onChange={handleOptionChangenoise} checked={selectedOptionnoise === 'noiseon'} />
    <span>ON</span>
  </label>
  <label>
    <input type="radio" name={"めたんnoise"} value="noiseoff" onChange={handleOptionChangenoise} checked={selectedOptionnoise === 'noiseoff'}/>
    <span>OFF</span>
  </label>
</div>
</div>
</ContainerSideBar>

</Sidebar>}


{   
<Container isVisible={isContainerVisible}>
<link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap" rel="stylesheet"></link>

<Title style={{"margin-bottom" : "8px" }}>AIめたん</Title>
{!recording && !loading && <ZundamonImageMobile src="/metan.png" alt="めたん"/>}
{recording && !loading && <ZundamonImageMobile  src="/metan_recording.png"  alt="めたん"/>}
{!recording && loading && <ZundamonImageMobile  src="/metan_server.png" alt="めたん"/>}
  <Description>
    録音ボタンをクリックして録音を開始 
  </Description>
  <Description>
    停止ボタンをクリックして録音を停止
  </Description>     
  <Description>
    その後、サーバーへ送信してAIめたんになってください。
  </Description>
{transcript !== "" &&     
<Container3 style={{
"backgroundColor": "#fdeff2", 
"borderRadius": "5%",
"color": "#696969", 
// "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)", // 豊かな影をつける
"fontFamily": "'M PLUS Rounded 1c', sans-serif",
"fontSize": "1.2em", 
"fontWeight": "bold", 
"letterSpacing": "0.05em",
"display": "flex", 
"alignItems": "center", 
"justifyContent": "center", 
"textTransform": "uppercase",
padding: "10px",
"margin": "10px", 
"transition": "transform 0.2s ease-in-out", // ホバー時の滑らかな変化を追加
position: "relative", // 吹き出しの尾のための相対位置設定
}}>


<p style={{ marginLeft:"10px",marginRight:"10px",marginBottom: "10px", marginTop: "10px" }}>{transcript}</p>
{transcript !== "" && <AudioButtonDL style={{ marginBottom: "10px",marginTop: "10px" }} color="#ee827c" dokuid={2} selif={transcript} ></AudioButtonDL>}
</Container3> }

  <Container3>
  <Button onClick={handleStartRecording} disabled={recording} color={buttonColor}>
      録音ボタン 
  </Button>

  <Button onClick={handleStopRecording} disabled={!recording} color={buttonColor}>
      録音停止ボタン
  </Button>
{ selectedOptionnoise === "noiseon" &&
  <Button disabled={!audioData || loading} onClick={handleSendToAPIGatewayNoise} color={buttonColor}>
      AIノイズキャンセリング
  </Button>}

  <Button disabled={!audioData || loading} onClick={handleSendToAPIGateway} color={buttonColor}>
      AIでめたん
  </Button>

  </Container3>
  
  {recording && selectedOptiongpu==="gpuoff" &&<Loading color={buttonColor} time={"4s"} acc={"linear"}></Loading >}
  {recording && selectedOptiongpu==="gpuon" &&<Loading color={buttonColor} time={"50s"} acc={"linear"}></Loading >}

  {recording && <div>残り時間: {countdown}秒</div>}

  {loading && <Loading color={buttonColor} time={"30s"} acc={"ease"}></Loading >}

  {audioData && <audio src={audioData} controls style={{"margin-bottom":"8px"}} />}

  {noiseAudio && (
      <div>
          <audio src={noiseAudioUrl} controls style={{"margin-bottom":"8px"}} />
      </div>
  )}

  {sagemakerAudio && (
      <div>
          <audio src={sagemakerAudio} controls controlslist="nodownload" style={{"margin-bottom":"8px"}}/>
      </div>
  )}

</Container>
}

{!recording && !loading &&  <ZundamonImage isVisible={isContainerVisible} src="/metan.png" alt="めたん" />}
{recording && !loading &&<ZundamonImage isVisible={isContainerVisible} src="/metan_recording.png" alt="めたん" />}
{!recording && loading && <ZundamonImage isVisible={isContainerVisible} src="/metan_server.png" alt="めたん" />}

</Container2>



        <FadeInSection isVisible={isVisible}>

        <Containerchar>
        <ZundamonImageSelif2 src="/metansetumei.png" alt="Zundamon" />
          <Container7> 
            
              <div className="mydict" style={charStyle}>
            <Title>四国めたん</Title>
            <AudioButton audio="/metan1.wav"  color ="#ee827c"></AudioButton>
            </div>
              <h3>常に金欠。趣味は中二病妄想。誰にでも遠慮しないので、基本的にタメ口。<br></br>
                ずんだもんの友達。口調はお嬢様、「ですわ」「～わよ」が語尾につく。<br></br>
                同じ音声合成ソフト<a href="https://voicevox.hiroshiba.jp/" target="_blank"  rel="noreferrer">VOICEVOX</a>のキャラクターであり、文字を音声に変換する。
              </h3>
              <Container3>
              <input style={inputStyle} placeholder="セリフを入力"  className="input" value ={text} 
              onChange={(event) => setText(event.target.value)} 
              />
              <AudioButtonDL selif = {text} color ="#ee827c" dokuid={2} ></AudioButtonDL>
              </Container3>
          </Container7>
        
      </Containerchar>
      </FadeInSection>
      </SwiperSlide>
    </Swiper>

    <FadeInSection2 isVisible={isVisible2}>

  <StyledHeader>AIずんだもんの作り方</StyledHeader>
      <Container4>
      <SelifParagraph>
        ずんだもんなのだ。東北きりたんの疑問に答えるために、AIずんだもんの作り方を四国めたんと一緒に解説するのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_teage.png" alt="Zundamon" />
    
      </Container4>
      </FadeInSection2>

      <Scroll>
      <Container4>
      <KiritanImageSelif src="/kiritan_left.png" alt="Zundamon" />
      <SelifParagraphKiritan>
      よろしくお願いします。
      </SelifParagraphKiritan>
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <SelifParagraph>
      よろしくお願いしますわ。
      </SelifParagraph>
      <ZundamonImageSelif src="/metan.png" alt="Zundamon" />
      </Container4>
      </Scroll>

      <ScrollScale>
      <Container5>
        <Images src="/react.jpg" alt="Zundamon" />
        <Images src="/rvc.webp" alt="Zundamon" />
        <Images src="/sagemaker.png" alt="Zundamon" />
      </Container5>
      </ScrollScale>


      <Scroll>
      <Container4>
      <KiritanImageSelif src="/kiritan_teage_left.png" alt="Zundamon" />
      <SelifParagraphKiritan>
      早速ですが、そもそもどんな技術が使われているのですか？
      </SelifParagraphKiritan>
      </Container4>
      </Scroll>


      <Scroll>
      <Container4>
      <Images src="/rvc.webp" alt="Zundamon" />
      <SelifParagraph>
      たくさんの技術がこのサイトには使われているのだ。
      まずは、ずんだもんの声を作るために、RVCという音声変換機械学習モデルを使ったのだ。このモデルでユーザーの声を僕たちの声に変換するのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_yubisasi.png" alt="Zundamon" />
    
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <KiritanImageSelif src="/kiritan_kyougaku_left.png" alt="Zundamon" />
      <SelifParagraphKiritan>これで、ユーザーのみんなが私たちの声になっているのですね。</SelifParagraphKiritan>
      </Container4>
      </Scroll>

      {/* <Scroll>
      <Container4>
      <Images src="/rvc.webp" alt="Zundamon" />
      <SelifParagraph>
      こいつはRVCという音声変換機械学習モデルなのだ。ざっくりいうとユーザの声を変換するAIなのだ。今回はこのRVCを使ってずんだもんの声を作ったのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_server.png" alt="Zundamon" />
    
      </Container4>
      </Scroll> */}

      <Scroll>
      <Container4>
      <Images src="/sagemaker.png" alt="Zundamon" />
      <SelifParagraph>
      上のRVCをAWS上で動かすためにSageMakerというサービスを使っているわ。SageMakerは機械学習モデルをデプロイできるサービスなのよ。
      </SelifParagraph>
      <ZundamonImageSelif src="/metan_server.png" alt="Zundamon" />
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <KiritanImageSelif src="/kiritan_kawaii_left.png" alt="Zundamon" />
      <SelifParagraphKiritan>
      画期的なサービスですね！そのSageMakerというサービスは無料で使うことができるのですか？
      </SelifParagraphKiritan>
      </Container4>
      </Scroll>



      <Scroll>
      <Container4>
      <SelifParagraph>
      残念ながら無料ではないのだ。
      具体的にどのようにサービスを利用しているか説明すると、SageMakerでデプロイしたエンドポイントをリアルタイム推論になるように設定したのだ。
      ml.m4.xlargeというインスタンスを使っているのだ。
      このインスタンスの使用料金が時間あたりに0.2ドルほどかかるからインスタンスの数を5に設定すると、1時間あたり1ドルほどかかるのだ。
      AWSから移行して、GCPのAI Platformに移行するのも考えているのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_jito.png" alt="Zundamon" />
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <SelifParagraph>
      チームといえど法人じゃないので、この出費はとても痛いわ。需要はあると思うので、マネタイズの方法を考えているのよ。
      他のGCPのAI Platformのようなサービスの利用することも考えているのわ。
      </SelifParagraph>
      <ZundamonImageSelif src="/metan_komaru.png" alt="Zundamon" />
      </Container4>
      </Scroll>

      <Scroll>
      <Container6>
      <Images2 src="/flow.png" alt="Zundamon" />
       </Container6>
      </Scroll>
      <Scroll>
      <Container4>
      <SelifParagraph>
      他にも、このサイトのバックエンドでは、多くの技術が使われているのだ。
      上の図をみると、どれだけの技術が使われているかわかるのだ。
      もっと詳しく知りたい人は、説明動画の<a href="https://youtu.be/fKpnQvnZu2Y" target= "blank"  rel="noreferrer">リンク</a>を見て欲しいのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda.png" alt="Zundamon" />
        
      </Container4>
      </Scroll>

      {/* <Scroll>
      <Container4>
      <SelifParagraph>
      API Gatewayには30秒制限という、ユーザーにパケットが返ってくるまでの時間の制限があるのだ。
      だから今回は録音時間を4秒に設定しているのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_nae.png" alt="Zundamon" />
      </Container4>
      </Scroll> */}

      <Scroll>
      <Container4>
      <KiritanImageSelif src="/kiritan_left.png" alt="Zundamon" />
      <SelifParagraphKiritan>
      では、フロントエンドにはどのような技術が使われているのですか？
      </SelifParagraphKiritan>
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <Images src="/react.jpg" alt="Zundamon" />
      <SelifParagraph>
      フロントエンドのメインはReactなのだ。これは、このサイトを作るために使ったフレームワークなのだ。ReactはJavaScriptのライブラリなのだ。
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_teage.png" alt="Zundamon" />
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <Images src="/atom.png" alt="Zundamon" />
      <SelifParagraph>
      styled-componentsを使って、CSSを書いているわ。Reactを使った理由は大規模になった時に、コンポーネントを使って管理しやすいからなのよ。
      より技術的なことは、Qiitaに後日まとめる予定よ。
      </SelifParagraph>
      <ZundamonImageSelif src="/metan_mannzyuu.png" alt="Zundamon" />
      </Container4>
      </Scroll>

      <Scroll>
      <Container4>
      <SelifParagraph>
      ここに挙げたすべての技術は、今回使うのが初めてだったのだ．．．だから完成させるのが大変だったのだ。でも、なんとか公開まですることができたのだ！
      特にAWSの知識がなかったので、AWSのドキュメントを読み漁ったのだ。大変だったのだ．．．
      </SelifParagraph>
      <ZundamonImageSelif src="/zunda_kosi.png" alt="Zundamon" />
      </Container4>
      </Scroll>
      
  </div>
  </>
);
};

export default App;