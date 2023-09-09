import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ticketActions } from "@/redux/slices/ticket.slice";
import { TicketImpact, TicketPriority } from "@/types/ticket";
import { Grid, MenuItem, TextField, styled } from "@mui/material";

var impacts = [{
    value: "low",
    label: "Low",
    'color': 'secondary'
},
{
    value: "medium",
    label: "Medium",
    color: 'warning'
},
{
    value: "high",
    label: "High",
    color: 'error'
}]

var priorities = [{
    value: "low",
    label: "Low",
},
{
    value: "medium",
    label: "Medium",
},
{
    value: "high",
    label: "High",
}]


function Step1() {

    const dispatch = useAppDispatch();

    const ticketState = useAppSelector(x => x.ticket)


    return <div>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    helperText="A simple title. For example: Github Action throw error"
                    fullWidth
                    value={ticketState.title}
                    onChange={(e) => dispatch(ticketActions.setTitle(e.target.value as string))} />
            </Grid>
            <Grid item sm={6}>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Impact"
                    helperText="How this issue impact your app or your project?"
                    value={ticketState.impact}
                    onChange={(e) => dispatch(ticketActions.setImpact(e.target.value as TicketImpact))}
                >
                    {impacts.map((option) => (
                        <MenuItem key={option.value} value={option.value} sx={{}}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item sm={6}>
                <TextField
                    id="priority"
                    select
                    label="Priority"
                    helperText="The priority criteria to solve this issue. (Please be honest)"
                    value={ticketState.priority}
                    onChange={(e) => dispatch(ticketActions.setPriority(e.target.value as TicketPriority))}
                >
                    {priorities.map((option) => (
                        <MenuItem key={option.value} value={option.value} sx={{}}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            {
                ticketState.priority !== 'low' &&
                <Grid item xs={12}>

                    <TextField
                        id="outlined-basic"
                        label="Priority reason"
                        variant="outlined"
                        helperText="Explain why this issue is high priority. For example: we have a client demo tomorrow and it depens on this issue"
                        fullWidth />

                </Grid>
            }

        </Grid>

    </div>
}

export default Step1;