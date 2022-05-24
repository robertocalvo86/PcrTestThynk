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
                          join r in context.PcrTestResults on b.PcrTestResultId equals r.PcrTestResultId into ptr
                          from n in ptr.DefaultIfEmpty()
                          join rt in context.PcrTestResultTypes on n.PcrTestResultTypeId equals rt.PcrTestResultTypeId into ptrt
                          from k in ptrt.DefaultIfEmpty()
                          join v in context.PcrTestVenues on a.PcrTestVenueId equals v.PcrTestVenueId

                          where b.PcrTestBookingStatusId == 1

                          select new Booking
                          {
                              BookingId = b.PcrTestBookingId,
                              Date = a.AllocationDate.ToString("dd/MM/yyyy HH:mm"),
                              Venue = v.Code + " - " + v.Name,
                              Status = s.Name,
                              LastChange = b.ModifiedDate.ToString("dd/MM/yyyy HH:mm"),
                              Result = k.Name,
                              ResultDate = n.ResultDate.ToString("dd/MM/yyyy HH:mm"),
                          }).ToListAsync();
        }

        public async Task<int> SetPCRTestResult(int bookingId, int resultTypeId)
        {
            DateTime now = DateTime.Now;
            PcrTestResult pcrTestResult = new PcrTestResult
            {
                ResultDate = now,
                PcrTestResultTypeId = resultTypeId
            };

            PcrTestBooking pcrTestBooking = await context.Set<PcrTestBooking>().Where(cd => cd.PcrTestBookingId == bookingId).SingleOrDefaultAsync();
            pcrTestBooking.PcrTestResult = pcrTestResult;
            pcrTestBooking.PcrTestBookingStatusId = 3;
            pcrTestBooking.ModifiedDate = now;

            return await context.SaveChangesAsync();
        }
    }
}
