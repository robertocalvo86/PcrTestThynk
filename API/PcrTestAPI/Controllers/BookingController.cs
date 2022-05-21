using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PcrTestAPI.Dto;
using PcrTestAPI.Models.DataAccesses;

namespace PcrTestAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly BookingDA bookingDA;

        private readonly ILogger<BookingController> logger;

        public BookingController(BookingDA bookingDA,
                                 ILogger<BookingController> _logger)
        {
            this.bookingDA = bookingDA;
            logger = _logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Venue>>> GetVenues()
        {
            try
            {
                return await this.bookingDA.GetVenues();
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<Booking>>> GetBookingsByIdentityCardNumber(string IdentityCardNumber)
        {
            try
            {
                return await this.bookingDA.GetBookingsByIdentityCardNumber(IdentityCardNumber);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }
    }
}