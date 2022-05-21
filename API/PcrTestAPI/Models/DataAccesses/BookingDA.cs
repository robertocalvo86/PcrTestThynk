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
    }
}
