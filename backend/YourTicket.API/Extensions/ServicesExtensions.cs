using YourTicket.API.Persistance.Services;

namespace YourTicket.API.Extensions
{
    public static class ServicesExtensions 
    {
        public static void AddInnerServices(this IServiceCollection services) {
            services.AddTransient<TicketsService>();
        }
    }
}