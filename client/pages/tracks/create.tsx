import { Grid, Button, TextField } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
import FileUpload from "../../components/FileUpload";
import StepWrapper from "../../components/StepWrapper";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";

const create = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0);

  const [picture, setPicture] = useState(null)
  const [audio, setAudio] = useState(null)

  const name = useInput('')
  const artist = useInput('')
  const text = useInput('')

  const back = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };
  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('artist', artist.value)
      formData.append('text', text.value)
      formData.append('picture', picture)
      formData.append('audio', audio)
      axios.post('http://localhost:5000/tracks', formData)
        .then(res => router.push('/tracks'))
        .catch(e => console.log(e))
    }
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction={"column"} style={{ padding: 20 }}>
            <TextField  {...name} style={{ marginTop: 10 }} label={"Name of track"} />
            <TextField  {...artist} style={{ marginTop: 10 }} label={"Name of Artis"} />
            <TextField {...text} 
              style={{ marginTop: 10 }}
              label={"Lyrics"}
              multiline
              rows={3}
            />
          </Grid>
        )}
        {activeStep === 1 && (
            <FileUpload setFile={setPicture} accept={"image/*"}>
                <Button>Load a cover</Button>
            </FileUpload>
        )}
                {activeStep === 2 && (
            <FileUpload setFile={setAudio} accept={"audio/*"}>
                <Button>Load  audio</Button>
            </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Back
        </Button>
        <Button onClick={next}>next</Button>
      </Grid>
    </MainLayout>
  );
};

export default create;
