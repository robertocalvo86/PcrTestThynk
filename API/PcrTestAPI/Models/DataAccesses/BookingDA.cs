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

        public async Task<List<string>> GetBookingDates(int VenueId)
        {
            int VenueNumberOfSpaces = (from v in context.PcrTestVenues
                                       where v.PcrTestVenueId == VenueId
                                       select v.NumberOfSpaces).FirstOrDefault();

            List<string> AvailableDays = new List<string>();

            for (int d = 1; d < 30; d++)
            {
                List<DateTime> dayAvailability = new List<DateTime>();
                DateTime firstDayOfAvailability = DateTime.Now.AddDays(d);


                List<DateTime> dayAvailabilityUpdated = await dayAvailabilities(VenueId, firstDayOfAvailability, VenueNumberOfSpaces);


                if (dayAvailabilityUpdated.Count > 0)
                    AvailableDays.Add(firstDayOfAvailability.ToString("dd/MM/yyyy"));
            }

            return AvailableDays;
        }

        public async Task<List<string>> GetBookingTimes(int VenueId, string date)
        {
            int VenueNumberOfSpaces = (from v in context.PcrTestVenues
                                       where v.PcrTestVenueId == VenueId
                                       select v.NumberOfSpaces).FirstOrDefault();

            List<string> AvailableTimes = new List<string>();

            List<string> AvailableDays = new List<string>();

            DateTime firstDayOfAvailability = DateTime.Parse(date);


            List<DateTime> dayAvailabilityUpdated = await dayAvailabilities(VenueId, firstDayOfAvailability, VenueNumberOfSpaces);

            foreach(DateTime dt in dayAvailabilityUpdated)
            {
                AvailableTimes.Add(dt.ToString("HH:mm"));
            }

            return AvailableTimes;
        }



        private async Task<List<DateTime>> dayAvailabilities(int VenueId, DateTime firstDayOfAvailability, int VenueNumberOfSpaces)
        {
            List<DateTime> dayAvailability = new List<DateTime>();

            DateTime firstAvailability = new DateTime(firstDayOfAvailability.Year, firstDayOfAvailability.Month, firstDayOfAvailability.Day, 9, 0, 0);
            DateTime lunchHour = new DateTime(firstDayOfAvailability.Year, firstDayOfAvailability.Month, firstDayOfAvailability.Day, 13, 0, 0);
            DateTime startHour = new DateTime(firstDayOfAvailability.Year, firstDayOfAvailability.Month, firstDayOfAvailability.Day, 0, 0, 0);
            DateTime endHour = new DateTime(firstDayOfAvailability.Year, firstDayOfAvailability.Month, firstDayOfAvailability.Day, 23, 0, 0);

            dayAvailability.Add(firstAvailability);

            for (int i = 0; i < 31; i++)
            {
                if (firstAvailability.AddMinutes(15) == lunchHour)
                {
                    firstAvailability = firstAvailability.AddHours(1);
                }
                firstAvailability = firstAvailability.AddMinutes(15);
                dayAvailability.Add(firstAvailability);
            }

            var allocations = await (from a in context.PcrTestVenueAllocations
                                     where a.PcrTestVenueId == VenueId &&
                                     (a.AllocationDate > startHour && a.AllocationDate < endHour)

                                     group new { a } by new { a.AllocationDate } into newGroup

                                     select new
                                     {
                                         allocation = newGroup.Key.AllocationDate,
                                         allocationCount = newGroup.Count()
                                     }).ToListAsync();


            List<DateTime> dayAvailabilityUpdated = new List<DateTime>();

            foreach (DateTime dt in dayAvailability)
            {
                if (!allocations.Any(el => el.allocation == dt && el.allocationCount >= VenueNumberOfSpaces))
                {
                    dayAvailabilityUpdated.Add(dt);
                }
            }

            return dayAvailabilityUpdated;
        }


        public async Task PostBooking(NewBooking newBooking)
        {
            string d = newBooking.Date + " " + newBooking.Time;
            DateTime allocationDate = DateTime.Parse(d);

            PcrTestVenueAllocation pcrTestVenueAllocation = new PcrTestVenueAllocation
            {
                AllocationDate = allocationDate,
                PcrTestVenueId = newBooking.Venue
            };

            PcrTestResult pcrTestResult = new PcrTestResult
            {
                ResultDate = DateTime.Now,
                PcrTestResultTypeId = 2 //Negative
            };

            PcrTestBooking technicalExpertAttachmentInfo = new PcrTestBooking
            {
                IdentityCardNumber = newBooking.IdentityCardNumber,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                PcrTestVenueAllocation = pcrTestVenueAllocation,
                PcrTestBookingStatusId = 1, //OnGoing
                PcrTestResult = pcrTestResult
            };

            context.Set<PcrTestBooking>().Add(technicalExpertAttachmentInfo);
            //context.PcrTestBookings.Add(technicalExpertAttachmentInfo);
            await context.SaveChangesAsync();
        }
    }
}
