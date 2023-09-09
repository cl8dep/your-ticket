'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, LinearProgress, styled } from '@mui/material';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import { useAppSelector } from '@/redux/hooks';
import Step4 from './components/Step4';

const steps = ['Start report', 'Describe the problem', 'Review', 'Status'];

const StepContent = styled('main')(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

export default function HorizontalLinearStepper() {

  const [activeStep, setActiveStep] = React.useState(1);
  const [createdTicket, setCreatedTicket] = React.useState<{} | false>(false)
  const ticketState = useAppSelector(x => x.ticket)

  const handleNext = () => {
    if (activeStep === 3) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      fetch(process.env.NEXT_PUBLIC_API_URL + 'ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketState),
      })
        .then(response => response.json())
        .then(data => {
          setCreatedTicket(data)
        })
        .catch((error) => {
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
        });
      return
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return <Step3 />
      default:
        return createdTicket ? <Step4 data={createdTicket}/> : <LinearProgress />
    }
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: 10 }}>
      <Typography variant="h4" component="h1" align='center' mb={8}>
        {createdTicket ? "Ticket created" : "Create a new ticket"}
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep - 1}>
          {steps.map((label, index) => {
            return (
              <Step key={label} completed={Boolean(createdTicket)} >
                <StepLabel >{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {
            activeStep !== 4 && (
              <>
                <Button
                  color="inherit"
                  disabled={activeStep === 1}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {activeStep === 3 ? 'Finish' : 'Next'}
                </Button>
              </>
            )
          }
        </Box>

        <StepContent>
          {renderStep()}
        </StepContent>
      </Box>
    </Container>
  );
}