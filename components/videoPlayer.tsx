import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import screenfull from 'screenfull';
import Img from './image';
import { getTrackBackground, Range } from 'react-range';
import { Direction, IRenderThumbParams, IRenderTrackParams } from 'react-range/lib/types';
import { VideoComponent, VideoPlayingState } from '../apiStrapi/models/component/video';
import { strapiImage } from '../apiStrapi/models/contact';
import moment from 'moment';
import { Episodes, EpisodesAndQuiz, Evaluation, Quiz, ShowingType } from '../apiNest/models/content/courseLms';
import axios from 'axios';
import Countdown from './countdown';

interface VideoContinue {
  episodeOrQuiz: EpisodesAndQuiz,
  callBackContinue: () => void,
}

type ReactVideoPlayerState = {
  url: string;
  pip: boolean,
  playing: boolean;
  controls: boolean;
  light: boolean | string;
  volume: number;
  muted: boolean;
  played: number;
  loaded: number;
  duration: number;
  playbackRate: number;
  loop: boolean;
  seeking: boolean;
  resolutions: any;
  currentResolution: number;
  fullscreen: boolean;
}

enum Directions {
  Horizontal,
  Vertical
}

function VideoPlayer({
  props,
  imageStrapi,
  videoContinue }: {
    props: VideoComponent,
    imageStrapi?: boolean,
    videoContinue?: VideoContinue
  }) {

  const [playbackOptions, setPlaybackOptions] = useState<number[]>([
    0.25,
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    1.75,
    2
  ]);
  const [continueVisible, setContinueVisible] = useState(false);
  const [progressCount, setProgressCount] = useState(0);
  const player = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef(null);
  const [controllerVisible, setControllerVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [playbackVisible, setPlaybackVisible] = useState(false);
  const [volumeVisible, setVolumeVisible] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoState, setVideoState] = useState<ReactVideoPlayerState>({
    url: `https://videodelivery.net/${props.video_id}/manifest/video.m3u8`,
    pip: false,
    playing: true,
    controls: props.control || true,
    light: props.autoplay ? false : props.video_thumbnail?.url ? props.video_thumbnail?.url : true,
    volume: 1,
    muted: props.muted || false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: props.loop || false,
    seeking: false,
    resolutions: [],
    currentResolution: -1,
    fullscreen: false,
  });

  const handleReady = () => {
    const hlsPlayer = player.current?.getInternalPlayer('hls');
    if (!hlsPlayer) return;
    if (props.lastSecond) {
      player.current?.seekTo(+props.lastSecond, 'seconds');
    }
    setVideoState({ ...videoState, resolutions: hlsPlayer.levels });
  }

  const setVideoResolution = (value: number) => {
    const hlsPlayer = player.current?.getInternalPlayer('hls');
    if (!hlsPlayer) return;
    setVideoState({ ...videoState, currentResolution: value });
    hlsPlayer.nextLevel = value;
  }

  const load = (url: string) => {
    setVideoState({
      ...videoState,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  const handlePlayPause = () => {
    setVideoState({ ...videoState, playing: !videoState?.playing });
  }

  const handleToggleLight = () => {
    setVideoState({ ...videoState, light: !videoState.light });
  }

  const handleToggleLoop = () => {
    setVideoState({ ...videoState, loop: !videoState.loop });
  }

  const handleVolumeChange = (value: number) => {
    setVideoState({ ...videoState, volume: value });
  }

  const handleToggleMuted = () => {
    setVideoState({ ...videoState, muted: !videoState.muted });
  }

  const handleSetPlaybackRate = (e: any) => {
    setVideoState({ ...videoState, playbackRate: parseFloat(e.target.value) })
  }

  const handleOnPlaybackRateChange = (speed: number) => {
    setVideoState({ ...videoState, playbackRate: speed })
  }

  const handleTogglePIP = () => {
    setVideoState({ ...videoState, pip: !videoState.pip })
  }

  const handlePlay = () => {
    setVideoState({ ...videoState, playing: true })
  }

  const handleEnablePIP = () => {
    setVideoState({ ...videoState, pip: true })
  }

  const handleDisablePIP = () => {
    setVideoState({ ...videoState, pip: false })
  }

  const handlePause = () => {
    setVideoState({ ...videoState, playing: false })
  }

  const handleSeekChange = (value: number) => {
    setVideoState({ ...videoState, played: value });
    player.current?.seekTo(value);
  }

  const handleProgress = (state: VideoPlayingState) => {
    if (!videoState.seeking) {
      setVideoState({ ...videoState, ...state });
    }
    if (progressCount > 3) {
      setControllerVisible(false);
      setProgressCount(0);
    }
    if (controllerVisible) {
      setProgressCount(progressCount + 1);
    }
    localStorage.setItem('lastSecond', state.playedSeconds.toString());
  }

  const handleEnded = () => {
    setContinueVisible(true);
    setVideoState({ ...videoState, playing: videoState.loop });
    props.handleEnded();
  }

  const handleContinue = () => {
    if (!continueVisible) return;
    videoContinue?.callBackContinue();
  }

  const handleDuration = (duration: number) => {
    setVideoState({ ...videoState, duration })
  }

  const handleClickFullscreen = () => {
    playerContainerRef.current && screenfull.toggle(playerContainerRef.current);
  }

  const handleVisible = (setState: Dispatch<SetStateAction<boolean>>) => {
    setState(true);
    setProgressCount(0);
  }

  const handleHidden = (setState: Dispatch<SetStateAction<boolean>>) => {
    setState(false)
  }

  const handleSwitchVisible = (visible: boolean, setState: Dispatch<SetStateAction<boolean>>) => {
    setState(!visible)
  }

  const handleStart = () => {
    setVideoStarted(true);
  }

  const getSignedToken = () => {
    axios({
      method: 'POST',
      url: `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACOOUNT}/stream/${props.video_id}/token`,
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN}`
      }
    }).then(res => {
      setVideoState({
        ...videoState,
        url: `https://videodelivery.net/${res.data.result.token}/manifest/video.m3u8`,
        light: props.autoplay ? false : props.video_thumbnail?.url ? props.video_thumbnail?.url : true,
        playing: true,
      });
    })
  }

  useEffect(() => {
    setContinueVisible(false);
    getSignedToken();
  }, [props]);

  const renderTrack = ({
    iRenderTrackParams,
    value,
    directions }: {
      iRenderTrackParams: IRenderTrackParams,
      value: number,
      directions: Directions
    }) => {
    let directionProps = {
      width: "",
      outerHeight: "",
      innerHeight: "",
      direction: Direction.Right
    }

    switch (directions) {
      case Directions.Horizontal:
        directionProps = {
          width: "100%",
          outerHeight: "auto",
          innerHeight: "6px",
          direction: Direction.Right
        }
        break;
      case Directions.Vertical:
        directionProps = {
          width: "6px",
          outerHeight: "100%",
          innerHeight: "100%",
          direction: Direction.Up
        }
        break;
    }

    return (
      <div
        onMouseDown={iRenderTrackParams.props.onMouseDown}
        onTouchStart={iRenderTrackParams.props.onTouchStart}
        style={{
          ...iRenderTrackParams.props.style,
          height: directionProps.outerHeight,
          display: "flex",
          width: directionProps.width
        }}
      >
        <div
          ref={iRenderTrackParams.props.ref}
          style={{
            height: directionProps.innerHeight,
            width: directionProps.width,
            borderRadius: "4px",
            background: getTrackBackground({
              values: [value * 100],
              colors: ["#E74E25", "#ccc"],
              min: 0,
              max: 100,
              direction: directionProps.direction,
            }),
            alignSelf: "center"
          }}
        >
          {iRenderTrackParams.children}
        </div>
      </div>
    )
  }

  const renderThumb = ({ props }: IRenderThumbParams) => (
    <div
      {...props}
      style={{
        ...props.style,
        height: "13px",
        width: "13px",
        borderRadius: "50px",
        backgroundColor: "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 2px 6px #AAA"
      }}
    >
    </div>
  )

  function getTrackName(value: Episodes | Quiz | Evaluation) {
    let name = '';
    switch (value.type) {
      case ShowingType.episode:
        const ep = value as Episodes;
        name = ep.episode_name;
        break;
      case ShowingType.quiz:
        const quiz = value as Quiz;
        name = `Quiz For Episode ${quiz.episode_number}`;
        break;
      case ShowingType.courseEvaluation:
        name = 'Post Course Evaluation';
        break;
    }
    return name;
  }

  return (
    <div className="player-wrapper video-player"
      onMouseMove={() => { handleVisible(setControllerVisible) }}
      onMouseLeave={() => { handleHidden(setControllerVisible) }}
      ref={playerContainerRef}>
      <ReactPlayer
        className="react-player"
        width="100%"
        height="100%"
        ref={player}
        url={videoState.url}
        pip={videoState.pip}
        light={imageStrapi ? strapiImage(videoState.light as string) : videoState.light}
        playing={videoState.playing}
        controls={false}
        loop={videoState.loop}
        playbackRate={videoState.playbackRate}
        volume={videoState.volume}
        muted={videoState.muted}
        onReady={handleReady}
        onStart={handleStart}
        onPlay={handlePlay}
        onEnablePIP={handleEnablePIP}
        onDisablePIP={handleDisablePIP}
        onPause={handlePause}
        onEnded={handleEnded}
        onProgress={handleProgress}
        onDuration={handleDuration}
        config={{
          file: {
            forceHLS: true
          }
        }}
      />
      {(videoContinue && continueVisible) && (
        <div className={`continue-wrapper`}>
          <div className="continue-block">
            <div className="child-block">
              <h5 className="color-white sm-f-s-14 ipad-f-s-16 sm-m-0">
                {getTrackName(videoContinue.episodeOrQuiz)}
              </h5>
              <p className="text-center sm-m-b-5 ipad-m-b-5">
                เริ่มบทเรียนใน
                <span className="color-primary">
                  &nbsp;
                  <Countdown second={5} callback={handleContinue}/> วินาที
                </span>
              </p>
            </div>
            <div className="child-block image-block">
              <Img
                src={"thumbnail_image" in videoContinue?.episodeOrQuiz ? videoContinue?.episodeOrQuiz?.thumbnail_image : ''}
                width={280}
                height={160} />
            </div>
            <div className="child-block button-block">
              <button
                className="btn btn-box sm-f-s-12 btn-small m-t-0 m-r-0  lg-m-b-10"
                onClick={() => videoContinue.callBackContinue()}>
                เริ่มเรียนทันที
              </button>
              <br />
              <button
                className='btn-link m-0'
                onClick={() => setContinueVisible(false)}>
                ออกจากบทเรียน
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={`controls-wrapper ${(controllerVisible && !continueVisible) ? "visible" : "hidden"} ${!videoStarted && "hidden"}`}>
        <div className="p-h-100" onClick={handlePlayPause}>
        </div>
        <div className={`video-controller ${!videoState.controls && "hidden"}`}>
          <div className="flex-column-center">
            <button className="control-button" onClick={handlePlayPause}>
              {videoState.playing ? (<Img src="/videoPlayer/pause-solid.svg"
                width={20}
                height={20}
                className="filter-white" />) : (<Img src="/videoPlayer/play-solid.svg"
                  width={20}
                  height={20}
                  className="filter-white" />)}
            </button>
          </div>
          <div className="d-flex align-items-center f-s-12 sm-f-s-8 color-white">
            {moment("2015-01-01").seconds(player.current?.getCurrentTime() || 0).format("mm:ss")}/
            {moment("2015-01-01").seconds(player.current?.getDuration() || 0).format("mm:ss")}
          </div>
          <div className="video-progress">
            <Range
              values={[videoState.played]}
              step={0.00001}
              min={0}
              max={0.99999}
              onChange={(values) => { handleSeekChange(values[0]) }}
              renderTrack={(params) => { return renderTrack({ iRenderTrackParams: params, value: videoState.played, directions: Directions.Horizontal }) }}
              renderThumb={renderThumb}
            />
          </div>
          <div className="control-right-group">
            <div className="flex-column-center"
              onMouseEnter={() => { handleVisible(setVolumeVisible) }}
              onMouseLeave={() => { handleHidden(setVolumeVisible) }}>
              <div className={`volume-progress flex-column-center ${volumeVisible ? "visible" : "hidden"}`}>
                <Range
                  values={[videoState.volume]}
                  step={0.00001}
                  min={0}
                  max={1}
                  onChange={(values) => { handleVolumeChange(values[0]) }}
                  renderTrack={(params) => {
                    return renderTrack({ iRenderTrackParams: params, value: videoState.volume, directions: Directions.Vertical })
                  }}
                  renderThumb={renderThumb}
                  direction={Direction.Up}
                />
              </div>
              <div className="flex-column-center control-button" onClick={handleToggleMuted}>
                {!videoState.muted ? (
                  <Img src="/videoPlayer/volume-solid.svg"
                    width={20}
                    height={20}
                    className="filter-white" />
                ) : (
                  <Img src="/videoPlayer/volume-xmark-solid.svg"
                    width={20}
                    height={20}
                    className="filter-white" />
                )}
              </div>
            </div>
            <div className="flex-column-center"
              onClick={() => { handleSwitchVisible(optionsVisible, setOptionsVisible) }}>
              <div className={`options-item ${optionsVisible ? "visible" : "hidden"}`}>
                <div className="option-resolutions">
                  <button className={`option-resolutions ${-1 === videoState.currentResolution && "resolutions-active"}`}
                    onClick={() => setVideoResolution(-1)}>Auto</button>
                  {videoState.resolutions.map((item: any, index: number) => {
                    return <button className={`option-resolutions f-s-14 ${index === videoState.currentResolution && "resolutions-active"}`}
                      key={index}
                      onClick={() => setVideoResolution(index)}>{item.height}</button>
                  })}
                </div>
              </div>
              <div className="control-button flex-column-center">
                <Img src="/videoPlayer/gear-solid.svg"
                  width={20}
                  height={20}
                  className="filter-white" />
              </div>
            </div>
            <div className="flex-column-center"
              onClick={() => { handleSwitchVisible(playbackVisible, setPlaybackVisible) }}>
              <div className={`options-item ${playbackVisible ? "visible" : "hidden"}`}>
                <div className="option-resolutions">
                  {playbackOptions.map((item: any, index: number) => {
                    return <button className={`option-resolutions sm-f-s-10 ${index === videoState.currentResolution && "resolutions-active"}`}
                      key={index}
                      onClick={() => handleOnPlaybackRateChange(item)}>{item}x</button>
                  })}
                </div>
              </div>
              <div className="control-button flex-column-center sm-f-s-10 cursor-default lg-w-50 color-white">
                {videoState.playbackRate}x
              </div>
            </div>
            <div className="flex-column-center">
              <div className="video-full-screen control-button" onClick={handleClickFullscreen}>
                <Img src="/videoPlayer/expand-wide-solid.svg"
                  width={20}
                  height={20}
                  className="filter-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer;
