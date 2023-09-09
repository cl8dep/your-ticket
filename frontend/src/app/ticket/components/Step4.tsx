import { useAppSelector } from "@/redux/hooks";
import { TicketStatusMapper } from "@/types/ticket";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import { formatDate } from '@/utils'

interface Step4Props {
    data: {
        ticketId: string;
        createdAt: string;
        status: number;
    }
}


function Step4(props: Step4Props) {

    const { data } = props;

    return <div>
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant="subtitle1">Ticket Id:</Typography>
                <Typography>{data.ticketId}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="subtitle1">Created at:</Typography>
                <Typography>{formatDate(data.createdAt)}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="subtitle1">Status: </Typography>
                <Typography>{TicketStatusMapper[data.status]}</Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="subtitle1">
                    To see the Ticket Status in the future keep your ticket id safe stored.
                    Go to <Link href="/status">here</Link> with your ticket id to see the status updates.
                </Typography>
            </Grid>
        </Grid>

    </div>
}

export default Step4;