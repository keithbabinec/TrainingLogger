using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using TrainingLoggerSharedLibrary.Database;
using TrainingLoggerSharedLibrary.Models;

namespace TrainingLoggerApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize("TrainingLoggerUser")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly ILogger<ActivityController> Logger;

        private readonly ConfigHelper Config;

        private readonly IDatabase Database;

        public ActivityController(ILogger<ActivityController> logger, ConfigHelper config, IDatabase database)
        {
            Logger = logger;
            Config = config;
            Database = database;
        }

        [HttpGet()]
        [Route("get/user")]
        public async Task<ActionResult> GetActivitiesByUser()
        {
            try
            {
                // extract the users OID claim from the auth token.
                // this should be stable for the lifetime of the user.

                var userObjectId = "";

                await Database.GetActivitiesByUserAsync(userObjectId).ConfigureAwait(false);
            }
            catch (ModelValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());

                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok();
        }

        [HttpPost()]
        [Route("add")]
        public async Task<ActionResult> AddActivity([FromBody]Activity activity)
        {
            try
            {
                await Database.AddActivityAsync(activity).ConfigureAwait(false);
            }
            catch (ModelValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());

                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok();
        }
    }
}
