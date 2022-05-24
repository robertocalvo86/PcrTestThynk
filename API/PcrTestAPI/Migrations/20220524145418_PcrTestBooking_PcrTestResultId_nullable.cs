using Microsoft.EntityFrameworkCore.Migrations;

namespace PcrTestAPI.Migrations
{
    public partial class PcrTestBooking_PcrTestResultId_nullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PcrTestBookings_PcrTestResults_PcrTestResultId",
                table: "PcrTestBookings");

            migrationBuilder.AlterColumn<int>(
                name: "PcrTestResultId",
                table: "PcrTestBookings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_PcrTestBookings_PcrTestResults_PcrTestResultId",
                table: "PcrTestBookings",
                column: "PcrTestResultId",
                principalTable: "PcrTestResults",
                principalColumn: "PcrTestResultId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PcrTestBookings_PcrTestResults_PcrTestResultId",
                table: "PcrTestBookings");

            migrationBuilder.AlterColumn<int>(
                name: "PcrTestResultId",
                table: "PcrTestBookings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PcrTestBookings_PcrTestResults_PcrTestResultId",
                table: "PcrTestBookings",
                column: "PcrTestResultId",
                principalTable: "PcrTestResults",
                principalColumn: "PcrTestResultId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
