using Microsoft.AspNetCore.Identity;

namespace YourTicket.API.Persistance.Models;

public class Ticket
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public TicketImpact Impact { get; set; }
    public TicketPriority Priority { get; set; }
    //TODO: add attatchemnts
    public TicketStatus Status { get; set; }
   // public ApplicationAccount CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ModifiedAt { get; set; }
}

public enum TicketImpact {
    LOW,
    MEDIUM,
    HIGH
}

public enum TicketPriority {
    LOW,
    MEDIUM,
    HIGH
}

public enum TicketStatus
{
    PENDING,
    IN_PROGRESS,
    REQUIRED_MORE_INFO,
    CLOSED,
    DONE
}