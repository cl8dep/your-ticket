import { useAppSelector } from "@/redux/hooks";
import { Grid, Typography } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

function Step3() {

    const ticketState = useAppSelector(x => x.ticket);

    return <div>
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant="subtitle1">Title</Typography>
                <Typography>{ticketState.title}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="subtitle1">Impact</Typography>
                <Typography>{ticketState.impact}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="subtitle1">Priority</Typography>
                <Typography>{ticketState.priority}</Typography>
            </Grid>
            {
                ticketState.priority !== 'low' &&
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Priority reason</Typography>
                    <Typography>{ticketState.priorityReason}</Typography>
                </Grid>
            }
            <Grid item xs={12}>
            <Typography variant="subtitle1">Description</Typography>
                <MDEditor.Markdown source={ticketState.description} style={{ whiteSpace: 'pre-wrap' }} />
            </Grid>
        </Grid>

    </div>
}

export default Step3;