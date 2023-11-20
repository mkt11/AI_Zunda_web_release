//   const MainPage = (props) => {
//     return (
//       <>
// <Container2>

// <ButtonSetting color={buttonColor} disabled={recording || loading} onClick = {toggleSidebar} >詳細設定</ButtonSetting>
//         {pagechange === false && <Sidebar isVisible={isContainerVisible}>
//         <ImageSetting png={props.png} name={props.name} />
//           {/* サイドバーの内容 */}
      
//           <Title style={{"text-align":"center" }}>詳細設定</Title>

//           <ContainerSideBar> 
//           <h2 style={{"text-align":"center" }}>ユーザーの性別</h2>
//           <div className="mydict" >  

//       <div>
//         <label>
//           <input type="radio" name={props.name} value="man" onChange={handleOptionChange} checked={selectedOption === 'man'} />
//           <span>男性</span>
//         </label>
//         <label>
//           <input type="radio" name={props.name} value="woman" onChange={handleOptionChange} checked={selectedOption === 'woman'}/>
//           <span>女性</span>
//         </label>
//       </div>
//     </div>
//     </ContainerSideBar>


//     <ContainerSideBar> 
//           <h2 style={{"text-align":"center" }}>GPU推論モード</h2>
//           <div className="mydict" >  

//       <div>
//         <label>
//           <input type="radio" name={props.name +"gpu"} value="gpuon" onChange={handleOptionChangegpu} checked={selectedOptiongpu === 'gpuon'} />
//           <span>ON</span>
//         </label>
//         <label>
//           <input type="radio" name={props.name +"gpu"} value="gpuoff" onChange={handleOptionChangegpu} checked={selectedOptiongpu === 'gpuoff'}/>
//           <span>OFF</span>
//         </label>
//       </div>
//     </div>
//     </ContainerSideBar>

//     <ContainerSideBar> 
//           <h2 style={{"text-align":"center" }}>音声認識　VOICEVOXモード</h2>
//           <div className="mydict" >  

//       <div>
//         <label>
//           <input type="radio" name={props.name +"vox"} value="voxon" onChange={handleOptionChangevox} checked={selectedOptionvox === 'voxon'} />
//           <span>ON</span>
//         </label>
//         <label>
//           <input type="radio" name={props.name +"vox"} value="voxoff" onChange={handleOptionChangevox} checked={selectedOptionvox === 'voxoff'}/>
//           <span>OFF</span>
//         </label>
//       </div>
//     </div>
//     </ContainerSideBar>


//     <ContainerSideBar> 
//           <h2 style={{"text-align":"center" }}>ノイズキャンセリングモード</h2>
//           <div className="mydict" >  

//       <div>
//         <label>
//           <input type="radio" name={props.name +"noise"} value="noiseon" onChange={handleOptionChangenoise} checked={selectedOptionnoise === 'noiseon'} />
//           <span>ON</span>
//         </label>
//         <label>
//           <input type="radio" name={props.name +"noise"} value="noiseoff" onChange={handleOptionChangenoise} checked={selectedOptionnoise === 'noiseoff'}/>
//           <span>OFF</span>
//         </label>
//       </div>
//     </div>
//     </ContainerSideBar>
    
    
    


//     </Sidebar>}

  
//   {   
//   <Container isVisible={isContainerVisible}>
//     <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap" rel="stylesheet"></link>

//     <Title style={{"margin-bottom" : "8px" }}>AI {props.name}</Title>
//     {!recording && !loading && <ZundamonImageMobile src={props.png} alt={props.name} />}
//     {recording && !loading && <ZundamonImageMobile  src={props.png_r} alt={props.name} />}
//     {!recording && loading && <ZundamonImageMobile  src={props.png_s} alt={props.name} />}
//         <Description>
//           録音ボタンをクリックして録音を開始 
//         </Description>
//         <Description>
//           停止ボタンをクリックして録音を停止
//         </Description>     
//         <Description>
//           その後、サーバーへ送信して{props.name}になってください。
//         </Description>
//     {transcript !== "" && props.name !== "きりたん"&&     
//     <Container3 style={{
//     "backgroundColor": "#ebf6f7", 
//     "borderRadius": "5%",
//     "color": "#696969", 
//     // "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)", // 豊かな影をつける
//     "fontFamily": "'M PLUS Rounded 1c', sans-serif",
//     "fontSize": "1.2em", 
//     "fontWeight": "bold", 
//     "letterSpacing": "0.05em",
//     "display": "flex", 
//     "alignItems": "center", 
//     "justifyContent": "center", 
//     "textTransform": "uppercase",
//     padding: "10px",
//     "margin": "10px", 
//     "transition": "transform 0.2s ease-in-out", // ホバー時の滑らかな変化を追加
//     position: "relative", // 吹き出しの尾のための相対位置設定
//   }}>
    
    
//     {props.name !== "きりたん" && <p style={{ marginLeft:"10px",marginRight:"10px",marginBottom: "10px", marginTop: "10px" }}>{transcript}</p>}
//     {props.name !== "きりたん" && transcript !== "" && <AudioButtonDL style={{ marginBottom: "10px",marginTop: "10px" }} color={props.color2} dokuid={props.dokuid} selif={transcript} ></AudioButtonDL>}
//     </Container3> }

//         <Container3>
//         <Button onClick={handleStartRecording} disabled={recording} color={buttonColor}>
//             録音ボタン 
//         </Button>

//         <Button onClick={handleStopRecording} disabled={!recording} color={buttonColor}>
//             録音停止ボタン
//         </Button>
//     { selectedOptionnoise === "noiseon" &&
//         <Button onClick={handleSendToAPIGatewayNoise} disabled={!audioData} color={buttonColor}>
//             AIノイズキャンセリング
//         </Button>}

//         <Button onClick={handleSendToAPIGateway} disabled={!audioData} color={buttonColor}>
//             AIで{props.name}
//         </Button>
  

//         </Container3>

//         {recording && <Loading color={buttonColor} time={"4s"} acc={"linear"}></Loading >}
//         {recording && <div>残り時間: {countdown}秒</div>}

//         {loading && <Loading color={buttonColor} time={"30s"} acc={"ease"}></Loading >}

//         {audioData && <audio src={audioData} controls style={{"margin-bottom":"8px"}} />}

//         {noiseAudio && (
//             <div>
//                 <audio src={noiseAudioUrl} controls style={{"margin-bottom":"8px"}} />
//             </div>
//         )}

//         {sagemakerAudio && (
//             <div>
//                 <audio src={sagemakerAudio} controls controlslist="nodownload" style={{"margin-bottom":"8px"}}/>
//             </div>
//         )}

//   </Container>
//   }
    
//     {!recording && !loading &&  <ZundamonImage isVisible={isContainerVisible} src={props.png} alt={props.name} />}
//     {recording && !loading &&<ZundamonImage isVisible={isContainerVisible} src={props.png_r} alt={props.name} />}
//     {!recording && loading && <ZundamonImage isVisible={isContainerVisible} src={props.png_s} alt={props.name} />}

// </Container2>



// </>
//     );
//   };