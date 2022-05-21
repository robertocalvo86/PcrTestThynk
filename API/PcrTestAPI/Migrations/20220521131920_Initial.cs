using Microsoft.EntityFrameworkCore.Migrations;

namespace PcrTestAPI.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PcrTestVenues",
                columns: table => new
                {
                    PcrTestVenueId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumberOfSpaces = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PcrTestVenues", x => x.PcrTestVenueId);
                });

            migrationBuilder.InsertData(
                table: "PcrTestVenues",
                columns: new[] { "PcrTestVenueId", "Code", "Name", "NumberOfSpaces" },
                values: new object[] { 1, "PC00", "G.Gali pharmacy", 1 });

            migrationBuilder.InsertData(
                table: "PcrTestVenues",
                columns: new[] { "PcrTestVenueId", "Code", "Name", "NumberOfSpaces" },
                values: new object[] { 2, "HC00", "Piri health center", 3 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PcrTestVenues");
        }
    }
}
