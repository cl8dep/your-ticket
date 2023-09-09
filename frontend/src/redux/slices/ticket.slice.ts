import { Ticket, TicketImpact, TicketPriority } from "@/types/ticket";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ReduxTicket extends Ticket {

}

const initialState: ReduxTicket = {
    title: "",
    impact: 'low',
    priority: 'low',
    description: "",
};

export const TicketSlice = createSlice({
    name: "ticket-slice",
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setImpact: (state, action: PayloadAction<TicketImpact>) => {
            state.impact = action.payload;
        },
        setPriority: (state, action: PayloadAction<TicketPriority>) => {
            state.priority = action.payload;
        },
        setPriorityReason: (state, action: PayloadAction<string>) => {
            state.priorityReason = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        }
    },
});

const actions = TicketSlice.actions;
export {
    actions as ticketActions
};

export default TicketSlice.reducer;