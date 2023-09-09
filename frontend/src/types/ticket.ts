export type TicketImpact = "low" | "medium" | "high";
export type TicketPriority = "low" | "medium" | "high";

export const TicketStatusMapper = ["Pending", "In Progress", "Required more info", "Closed", "Done"]
export const TicketImpactMapper = ["Low", "Medium", "High"] 
export const TicketPriorityMapper = ["Low", "Medium", "High"] 

export type Ticket = {
    title: string;
    impact: TicketImpact;
    priority: TicketPriority;
    priorityReason?: string;
    description: string;
}