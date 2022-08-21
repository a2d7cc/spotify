import React, { useEffect } from "react";
import { IconButton, Grid } from "@material-ui/core";
import { PlayArrow, Pause, VolumeUp } from "@material-ui/icons";
import styles from '../styles/Player.module.scss'
import { ITrack } from "../types/tracks";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelectors";
import { useActions } from "../hooks/useActions";

let audio;

const Player = () => {
    const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration } = useActions()

    useEffect(() => {
      console.log('useEffect in Player')
      if(!audio) {
        audio = new Audio()
      } else {
        setAudio()
        play()
      }
    }, [active]) 

    const setAudio = () => {
      if (active) {
        audio.src = 'http://localhost:5000/' + active.audio
        audio.volume = volume / 100
        audio.onloadedmetadata = () => {
          setDuration(Math.ceil(audio.duration))
        }
        audio.ontimeupdate = () => {
          setCurrentTime(Math.ceil(audio.currentTime))
        }
      }
    }

    const play = () => {
      console.log(pause)
      if(!pause) {
        playTrack()
        audio.play()
      } else {
        pauseTrack()
        audio.pause()
      }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
      audio.volume = Number(e.target.value) / 100
      setVolume(Math.ceil(Number(e.target.value)))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
      audio.currentTime = Number(e.target.value)
      setCurrentTime(Math.ceil(Number(e.target.value)))
    }



  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {pause ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Grid container direction="column" style={{width: 200, margin: '0 20px'}} >
            <div>{active?.name}</div>
            <div  style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
        </Grid>
        <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
        <VolumeUp style={{marginLeft: 'auto'}} />
        <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
