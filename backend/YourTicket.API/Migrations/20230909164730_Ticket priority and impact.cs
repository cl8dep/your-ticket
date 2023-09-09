using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourTicket.API.Migrations
{
    /// <inheritdoc />
    public partial class Ticketpriorityandimpact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Impact",
                table: "Tickets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Tickets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Impact",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Tickets");
        }
    }
}
