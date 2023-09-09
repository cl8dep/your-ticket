import { TicketImpactMapper, TicketPriorityMapper, TicketStatusMapper } from "@/types/ticket";
import { formatDistanceToNow } from 'date-fns';

export function formatDate(date: string) {
    var dateParsed = new Date(Date.parse(date));
    return new Intl.DateTimeFormat().format(dateParsed);
}

export function formatRelativeDate(date: string) {
    const dateParsed = new Date(date);
    return formatDistanceToNow(dateParsed, { addSuffix: true })
}


export function formatTicketStatus(status: number) {
    return TicketStatusMapper[status];
}

export function formatTicketImpact(status: number) {
    return TicketImpactMapper[status];
}

export function formatTicketPriority(status: number) {
    return TicketPriorityMapper[status];
}