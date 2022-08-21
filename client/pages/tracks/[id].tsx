import { Button, dividerClasses, Grid } from "@material-ui/core";
import React, {useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import { ITrack } from "../../types/tracks";
import { TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useInput } from "../../hooks/useInput";

const TrackPage = ({serverTrack}) => {
  const [track, setTrack] = useState(serverTrack)
  const router = useRouter()
  const username = useInput('')
  const text = useInput('')

  const addComment = async () => {
    console.log('addComment')
    try {
      const response = await axios.post('http://localhost:5000/tracks/comment', {
        username: username.value, text: text.value, trackId: track._id
      })
      setTrack({...track, comments: [...track.comments, response.data]})
    } catch (error) {
      console.log(error)
    }
  }

  return <MainLayout>
    <Button onClick={() => router.push('/tracks')} style={{fontSize: 32}}>
        To list
    </Button>
    <Grid container style={{margin: '20px 0'}}>
        <img src={'http://localhost:5000/' + track.picture} width={200} height={200} />
        <div style={{marginLeft: 30}}>
            <h1>Name of track - {track.name}</h1>
            <h1>Artists - {track.artist}</h1>
            <h1>Listened - {track.listens}</h1>
        </div>
    </Grid>
    <h1>Lyrics</h1>
    <p>{track.text}</p>
    <h1>Comments Section</h1>
    <Grid container>
        <TextField  {...username} label="Your name"  fullWidth />
        <TextField  {...text} label="Message"  fullWidth multiline rows={4}/>
        <Button onClick={addComment}>Send</Button>
    </Grid>
    <div>
        {track.comments.map(comment => 
            <div>
                <div>Author - {comment.username}</div>
                <div>Comment - {comment.text}</div>
            </div>
            )}
    </div>
  </MainLayout>;
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async({params}) => {
  const response = await axios.get('http://localhost:5000/tracks/' + params.id)
  return {
    props: {
      serverTrack: response.data
    }
  }
}