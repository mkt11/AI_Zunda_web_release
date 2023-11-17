<Container2>

<ButtonSetting disabled={recording} onClick = {toggleSidebar} >詳細設定</ButtonSetting>
        <Sidebar isVisible={isContainerVisible}>


        <ImageSetting png="/zunda.png" name="ずんだもん"></ImageSetting>
          {/* サイドバーの内容 */}
          <p>詳細設定</p>
          <p>詳細設定は現在準備中です。</p>
          <div className="mydict">
      <div>
        <label>
          <input type="radio" name={"ずんだもん"} value="man" onChange={handleOptionChange} checked={selectedOption === 'man'}/>
          <span>男性</span>
        </label>
        <label>
          <input type="radio" name={"ずんだもん"} value="woman" onChange={handleOptionChange} checked={selectedOption === 'woman'}/>
          <span>女性</span>
        </label>
      </div>
    </div>
        </Sidebar>

  
  {   
  <Container isVisible={isContainerVisible}>

    <Title>AI {"ずんだもん"}</Title>
    {!recording && !loading && <ZundamonImageMobile src={"/zunda.png"} alt={"ずんだもん"} />}
    {recording && !loading && <ZundamonImageMobile  src={"/zunda_recording.png"} alt={"ずんだもん"} />}
    {!recording && loading && <ZundamonImageMobile  src={"/zunda_server.png"} alt={"ずんだもん"} />}

        <Description>
          録音ボタンをクリックして録音を開始 
        </Description>
        <Description>
          停止ボタンをクリックして録音を停止
        </Description>     
        <Description>
          その後、サーバーへ送信して{"ずんだもん"}になってください。
        </Description>
    {transcript !== "" &&     <Container3 style={{"background-color" : "#ebf6f7" , "borderRadius": "20%" , "padding-left": "24px"}}>
    {"ずんだもん" !== "きりたん" && <p>{transcript}</p>}
    {"ずんだもん" !== "きりたん" && transcript !== "" && <AudioButtonDL color="" dokuid={3} selif={transcript} ></AudioButtonDL>}
    </Container3> }

        <Container3>
        <Button onClick={handleStartRecording} disabled={recording} color={buttonColor}>
            録音ボタン 
        </Button>

        <Button onClick={handleStopRecording} disabled={!recording} color={buttonColor}>
            録音停止ボタン
        </Button>
        <Button onClick={handleSendToAPIGateway} disabled={!audioData} color={buttonColor}>
            AIで{"ずんだもん"}
        </Button>


        </Container3>
        {/* <Loading color={buttonColor}></Loading> */}
        {recording && <Loading color={buttonColor} time={"4s"} acc={"linear"}/>}
        {/* {recording && <LoadingIndicator />} */}
        {recording && <div>残り時間: {countdown}秒</div>}
        {loading && <Loading color={buttonColor} time={"30s"} acc={"ease-out"}/>}
        {/* {loading && <LoadingIndicator />} */}

        {audioData && <audio src={audioData} controls />}
        {sagemakerAudio && (
            <div>
                <audio src={sagemakerAudio} controls controlslist="nodownload" />
            </div>
        )}
  </Container>
  }

    {!recording && !loading &&  <ZundamonImage isVisible={isContainerVisible} src={"/zunda.png"} alt={"ずんだもん"} />}
    {recording && !loading &&<ZundamonImage isVisible={isContainerVisible} src={"/zunda_recording.png"} alt={"ずんだもん"} />}
    {!recording && loading && <ZundamonImage isVisible={isContainerVisible} src={"/zunda_server.png"} alt={"ずんだもん"} />}

</Container2>