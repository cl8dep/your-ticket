using Microsoft.AspNetCore.Http.HttpResults;
using YourTicket.API.Models;
using YourTicket.API.Persistance.Database;
using YourTicket.API.Persistance.Models;

namespace YourTicket.API.Persistance.Services
{

    public class TicketsService
    {
        public MainDbContext MainDbContext { get; set; }

        public TicketsService(MainDbContext mainDbContext)
        {
            MainDbContext = mainDbContext;
        }


        public async Task<Result<object>> GetTicketDetails(int id, bool extendDetails = false) {
            var ticket  = await MainDbContext.Tickets.FindAsync(id);
            if (ticket == null) {
                return new Result<object> {
                    Errors = new List<Exception> {
                        new("NOT_FOUND")
                    }
                };
            }

            // TODO: Implement extend details

            var result = new {
                ticket.Id,
                ticket.Title,
                ticket.Status,
                ticket.CreatedAt,
                ticket.ModifiedAt
            };

            return new Result<object> {
                Value = result
            };
        }

        public async Task<Result<object>> CreateTicket(Ticket ticket)
        {
            var result = await MainDbContext.Tickets.AddAsync(ticket);
            await MainDbContext.SaveChangesAsync();

            return new Result<object> {
                Value = new {
                    result.Entity.Id,
                    result.Entity.Status,
                    result.Entity.CreatedAt,
                }
            };
        }
    }
}