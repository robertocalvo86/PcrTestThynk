using PcrTestAPI.Models.Contexts;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PcrTestAPI.Models.Entities;
using PcrTestAPI.Dto;
using System;

namespace PcrTestAPI.Models.DataAccesses
{
    public class BackOfficeDA
    {
        private readonly DBContext context;

        public BackOfficeDA(DBContext _context)
        {
            context = _context;
        }

        public async Task<List<Booking>> GetBookings()
        {
            return await (from b in context.PcrTestBookings
                          join s in context.PcrTestBookingStatuses on b.PcrTestBookingStatusId equals s.PcrTestBookingStatusId
                          join a in context.PcrTestVenueAllocations on b.PcrTestVenueAllocationId equals a.PcrTestVenueAllocationId
                          join r in context.PcrTestResults on b.PcrTestResultId equals r.PcrTestResultId
                          join v in context.PcrTestVenues on a.PcrTestVenueId equals v.PcrTestVenueId
                          join rt in context.PcrTestResultTypes on r.PcrTestResultTypeId equals rt.PcrTestResultTypeId


                          select new Booking
                          {
                              BookingId = b.PcrTestBookingId,
                              Date = a.AllocationDate.ToString("dd/MM/yyyy"),
                              Venue = v.Code + " - " + v.Name,
                              Status = s.Name,
                              LastChange = b.ModifiedDate.ToString("dd/MM/yyyy"),
                              Result = rt.Name,
                              ResultDate = r.ResultDate.ToString("dd/MM/yyyy"),
                          }).ToListAsync();
        }
    }
}
