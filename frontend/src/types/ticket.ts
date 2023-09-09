export type TicketImpact = "low" | "medium" | "high";
export type TicketPriority = "low" | "medium" | "high";

export const TicketStatusMapper = ["In Progress"]

export type Ticket = {
    title: string;
    impact: TicketImpact;
    priority: TicketPriority;
    priorityReason?: string;
    description: string;
}