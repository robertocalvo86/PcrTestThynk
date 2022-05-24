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
    public class BackOfficeController : ControllerBase
    {
        private readonly BackOfficeDA backOfficeDA;

        private readonly ILogger<BookingController> logger;

        public BackOfficeController(BackOfficeDA backOfficeDA,
                                 ILogger<BookingController> _logger)
        {
            this.backOfficeDA = backOfficeDA;
            logger = _logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Booking>>> GetBookings()
        {
            try
            {
                return await this.backOfficeDA.GetBookings();
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }
    }
}