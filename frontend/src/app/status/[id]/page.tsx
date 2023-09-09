/* eslint-disable @next/next/no-async-client-component */

import * as React from 'react';

import Typography from '@mui/material/Typography';
import { Card, Container, Grid, LinearProgress, Step, StepLabel, Stepper, styled } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import { joinUrl } from '@/utils';
import { notFound } from 'next/navigation';
import { formatDate, formatRelativeDate, formatTicketImpact, formatTicketPriority, formatTicketStatus } from '@/utils/format';

interface StatusPageProps {
  params: {
    id: string
  }
}

const statusSteps = ["Pending", "In progress", "Done"]

export default async function StatusPage(props: StatusPageProps) {

  const { params } = props;

  const data = await getData(params.id)

  console.log(data)

  if (!data)
    notFound();

  return (
    <Container maxWidth="sm" sx={{ marginTop: 10 }}>
      <Typography variant="h4" component="h1" align='center' mb={8}>
        Ticket details
      </Typography>

      <Card sx={{ p: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>Title:</Typography>
            <Typography >{data.title}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1'>Created at:</Typography>
            <Typography >{formatDate(data.createdAt)} ({formatRelativeDate(data.modifiedAt)})</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1'>Last modification:</Typography>
            <Typography >{formatDate(data.modifiedAt)} ({formatRelativeDate(data.modifiedAt)})</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>Status:</Typography>
            <Stepper activeStep={data.status}>
              {statusSteps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel >{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
        </Grid>

        <Typography variant="caption" component="div" color="textSecondary" sx={{mt: 5}} textAlign="center">
          Please authenticate to view more ticket details.
        </Typography>
      </Card>
    </Container>
  );
}

async function getData(id: string) {
  const url = joinUrl(process.env.NEXT_PUBLIC_API_URL, 'ticket', id)
  const response = await fetch(url);

  if (!response.ok) {
    return undefined;
  }

  return response.json()
}