'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, LinearProgress, styled } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import Loading from './loading';

const steps = ['Start report', 'Describe the problem', 'Review', 'Status'];

const Content = styled('main')(({ theme }) => ({
    marginTop: theme.spacing(2),
}))

interface LayoutProps extends React.PropsWithChildren<{}> {

}

export default function StatusPage(props: LayoutProps) {

    const { children } = props;

    return (
        <Container maxWidth="sm" sx={{ marginTop: 10 }}>
            <Content>
                <React.Suspense fallback={<Loading />}>
                    {children}
                </React.Suspense>
            </Content>
        </Container>
    );
}