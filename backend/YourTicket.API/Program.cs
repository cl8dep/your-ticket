using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using YourTicket.API.Persistance.Database;
using YourTicket.API.Persistance.Models;

var builder = WebApplication.CreateBuilder(args);

Environment.SetEnvironmentVariable("UPLOAD_FOLDER", Path.Combine(builder.Environment.ContentRootPath, "uploads"));

if (!Directory.Exists(Environment.GetEnvironmentVariable("UPLOAD_FOLDER")))
{
    Directory.CreateDirectory(Environment.GetEnvironmentVariable("UPLOAD_FOLDER"));
}

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder(IdentityConstants.BearerScheme)
        .RequireAuthenticatedUser()
        .Build();
});

var connectionString = builder.Configuration.GetConnectionString("MainDatabase") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<MainDbContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddDefaultIdentity<ApplicationAccount>()
.AddEntityFrameworkStores<MainDbContext>()
.AddApiEndpoints();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 4;
    options.Password.RequiredUniqueChars = 1;
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyz";
    options.User.RequireUniqueEmail = true;
});

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Environment.GetEnvironmentVariable("UPLOAD_FOLDER") ?? throw new InvalidOperationException("UPLOAD_FOLDER not found.")),
    RequestPath = "/static"
});
app.UseRouting();

app.UseAuthorization();

app.MapGroup("/account").MapIdentityApi<ApplicationAccount>();

app.MapControllers();

app.Run();
