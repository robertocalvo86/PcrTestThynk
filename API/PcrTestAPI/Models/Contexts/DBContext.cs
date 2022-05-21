using Microsoft.EntityFrameworkCore;
using PcrTestAPI.Models.Entities;

namespace PcrTestAPI.Models.Contexts
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PcrTestVenue>().HasData(
                new PcrTestVenue
                {
                    PcrTestVenueId = 1,
                    Code = "PC00",
                    Name = "G.Gali pharmacy",
                    NumberOfSpaces = 1
                },
                new PcrTestVenue
                {
                    PcrTestVenueId = 2,
                    Code = "HC00",
                    Name = "Piri health center",
                    NumberOfSpaces = 3
                }
            );

            modelBuilder.Entity<PcrTestBookingStatus>().HasData(
                new PcrTestBookingStatus
                {
                    PcrTestBookingStatusId = 1,
                    Name = "OnGoing"
                },
                new PcrTestBookingStatus
                {
                    PcrTestBookingStatusId = 2,
                    Name = "Deleted"
                },
               new PcrTestBookingStatus
               {
                   PcrTestBookingStatusId = 3,
                   Name = "Closed"
               }
            );

            modelBuilder.Entity<PcrTestResultType>().HasData(
                new PcrTestResultType
                {
                    PcrTestResultTypeId = 1,
                    Name = "Positive"
                },
                new PcrTestResultType
                {
                    PcrTestResultTypeId = 2,
                    Name = "Negative"
                }
            );
        }

        public DbSet<PcrTestBooking> PcrTestBookings { get; set; }
        public DbSet<PcrTestBookingStatus> PcrTestBookingStatuses { get; set; }
        public DbSet<PcrTestResult> PcrTestResults { get; set; }
        public DbSet<PcrTestResultType> PcrTestResultTypes { get; set; }
        public DbSet<PcrTestVenue> PcrTestVenues { get; set; }
        public DbSet<PcrTestVenueAllocation> PcrTestVenueAllocations { get; set; }
        public DbSet<__Log> __Logs { get; set; }

    }
}
