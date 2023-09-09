
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using YourTicket.API.Persistance.Models;

namespace YourTicket.API.Persistance.Database;

public class MainDbContext : IdentityDbContext<ApplicationAccount>
{
    public MainDbContext(DbContextOptions<MainDbContext> options)
        : base(options)
    {

        
    }

    public DbSet<Ticket> Tickets { get; set; }
}