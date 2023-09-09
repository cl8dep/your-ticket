using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace YourTicket.API.Models
{
    public class CreateTicketRequest
    {
        [Required]
        public string Title { get; set; }
        [DefaultValue("low")]
        public string Impact { get; set; }
        [DefaultValue("low")]
        public string Priority { get; set; }

        public string? PriorityReason { get; set; }
        public string Description { get; set; }
    }
}