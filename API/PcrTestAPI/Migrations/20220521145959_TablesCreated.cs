using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PcrTestAPI.Migrations
{
    public partial class TablesCreated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "__Logs",
                columns: table => new
                {
                    __LogId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LogDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LogMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LogLevel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LogIP = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LogURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LogException = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LogUserID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LogModule = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LogCallSite = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LogSessionID = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK___Logs", x => x.__LogId);
                });

            migrationBuilder.CreateTable(
                name: "PcrTestBookingStatuses",
                columns: table => new
                {
                    PcrTestBookingStatusId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PcrTestBookingStatuses", x => x.PcrTestBookingStatusId);
                });

            migrationBuilder.CreateTable(
                name: "PcrTestResultTypes",
                columns: table => new
                {
                    PcrTestResultTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PcrTestResultTypes", x => x.PcrTestResultTypeId);
                });

            migrationBuilder.CreateTable(
                name: "PcrTestVenueAllocations",
                columns: table => new
                {
                    PcrTestVenueAllocationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AllocationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PcrTestVenueId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PcrTestVenueAllocations", x => x.PcrTestVenueAllocationId);
                    table.ForeignKey(
                        name: "FK_PcrTestVenueAllocations_PcrTestVenues_PcrTestVenueId",
                        column: x => x.PcrTestVenueId,
                        principalTable: "PcrTestVenues",
                        principalColumn: "PcrTestVenueId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PcrTestResults",
                columns: table => new
                {
                    PcrTestResultId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResultDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PcrTestResultTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PcrTestResults", x => x.PcrTestResultId);
                    table.ForeignKey(
                        name: "FK_PcrTestResults_PcrTestResultTypes_PcrTestResultTypeId",
                        column: x => x.PcrTestResultTypeId,
                        principalTable: "PcrTestResultTypes",
                        principalColumn: "PcrTestResultTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PcrTestBookings",
                columns: table => new
                {
                    PcrTestBookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdentityCardNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PcrTestVenueAllocationId = table.Column<int>(type: "int", nullable: false),
                    PcrTestBookingStatusId = table.Column<int>(type: "int", nullable: false),
                    PcrTestResultId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PcrTestBookings", x => x.PcrTestBookingId);
                    table.ForeignKey(
                        name: "FK_PcrTestBookings_PcrTestBookingStatuses_PcrTestBookingStatusId",
                        column: x => x.PcrTestBookingStatusId,
                        principalTable: "PcrTestBookingStatuses",
                        principalColumn: "PcrTestBookingStatusId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PcrTestBookings_PcrTestResults_PcrTestResultId",
                        column: x => x.PcrTestResultId,
                        principalTable: "PcrTestResults",
                        principalColumn: "PcrTestResultId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PcrTestBookings_PcrTestVenueAllocations_PcrTestVenueAllocationId",
                        column: x => x.PcrTestVenueAllocationId,
                        principalTable: "PcrTestVenueAllocations",
                        principalColumn: "PcrTestVenueAllocationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "PcrTestBookingStatuses",
                columns: new[] { "PcrTestBookingStatusId", "Name" },
                values: new object[,]
                {
                    { 1, "OnGoing" },
                    { 2, "Deleted" },
                    { 3, "Closed" }
                });

            migrationBuilder.InsertData(
                table: "PcrTestResultTypes",
                columns: new[] { "PcrTestResultTypeId", "Name" },
                values: new object[,]
                {
                    { 1, "Positive" },
                    { 2, "Negative" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PcrTestBookings_PcrTestBookingStatusId",
                table: "PcrTestBookings",
                column: "PcrTestBookingStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_PcrTestBookings_PcrTestResultId",
                table: "PcrTestBookings",
                column: "PcrTestResultId");

            migrationBuilder.CreateIndex(
                name: "IX_PcrTestBookings_PcrTestVenueAllocationId",
                table: "PcrTestBookings",
                column: "PcrTestVenueAllocationId");

            migrationBuilder.CreateIndex(
                name: "IX_PcrTestResults_PcrTestResultTypeId",
                table: "PcrTestResults",
                column: "PcrTestResultTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PcrTestVenueAllocations_PcrTestVenueId",
                table: "PcrTestVenueAllocations",
                column: "PcrTestVenueId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "__Logs");

            migrationBuilder.DropTable(
                name: "PcrTestBookings");

            migrationBuilder.DropTable(
                name: "PcrTestBookingStatuses");

            migrationBuilder.DropTable(
                name: "PcrTestResults");

            migrationBuilder.DropTable(
                name: "PcrTestVenueAllocations");

            migrationBuilder.DropTable(
                name: "PcrTestResultTypes");
        }
    }
}
