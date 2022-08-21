import React from 'react'
import { Container, StepLabel, Stepper, Step, Grid, Card }  from '@material-ui/core';


interface StepWrapperProps {
    activeStep: number;

}

const steps = ['Information about track', 'Load a cover', 'Load a track']
const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
  return (
    <Container>
        <Stepper activeStep={activeStep}>
            {steps.map((step, index) => 
                <Step key={index} completed={activeStep > index}>
                    <StepLabel>{step}</StepLabel>
                </Step>)}
        </Stepper>
        <Grid container justifyContent="center" style={{margin: '70ox 0', height: 270}}>
            <Card style={{width: 600}}>
                {children}
            </Card>
        </Grid>
    </Container>
  )
}

export default StepWrapper