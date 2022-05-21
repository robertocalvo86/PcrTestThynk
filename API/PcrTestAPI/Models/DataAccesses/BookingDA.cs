using PcrTestAPI.Models.Contexts;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PcrTestAPI.Models.Entities;
using PcrTestAPI.Dto;

namespace PcrTestAPI.Models.DataAccesses
{
    public class BookingDA
    {
        private readonly DBContext context;

        public BookingDA(DBContext _context)
        {
            context = _context;
        }


        public async Task<List<Venue>> GetVenues()
        {
            return await context.Set<PcrTestVenue>().Select((cdt) =>
            new Venue
            {
                VenueId = cdt.PcrTestVenueId,
                Code = cdt.Code,
                Name = cdt.Name
            }).ToListAsync();
        }

        public async Task<List<Booking>> GetBookingsByIdentityCardNumber(string IdentityCardNumber)
        {
            return await (from b in context.PcrTestBookings
                          join s in context.PcrTestBookingStatuses on b.PcrTestBookingStatusId equals s.PcrTestBookingStatusId
                          join a in context.PcrTestVenueAllocations on b.PcrTestVenueAllocationId equals a.PcrTestVenueAllocationId
                          join r in context.PcrTestResults on b.PcrTestResultId equals r.PcrTestResultId
                          join v in context.PcrTestVenues on a.PcrTestVenueId equals v.PcrTestVenueId
                          join rt in context.PcrTestResultTypes on r.PcrTestResultTypeId equals rt.PcrTestResultTypeId

                          where b.IdentityCardNumber == IdentityCardNumber

                          select new Booking
                          {
                              BookingId = b.PcrTestBookingId,
                              Date = a.AllocationDate,
                              Venue = v.Code + " - " + v.Name,
                              Status = s.Name,
                              LastChange = b.ModifiedDate,
                              Result = rt.Name,
                              ResultDate = r.ResultDate
                          }).ToListAsync();
        }
    }
}
