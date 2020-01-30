using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TrainingLoggerSharedLibrary.Database;
using TrainingLoggerSharedLibrary.Exceptions;
using TrainingLoggerSharedLibrary.Models;

namespace TrainingLoggerApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize("TrainingLoggerUser")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly TelemetryClient Logger;

        private readonly ConfigHelper Config;

        private readonly IDatabase Database;

        public ActivityController(TelemetryClient logger, ConfigHelper config, IDatabase database)
        {
            Logger = logger;
            Config = config;
            Database = database;
        }

        [HttpGet()]
        [Route("get/user")]
        public async Task<ActionResult> GetActivitiesByUser()
        {
            var eventProps = GetDefaultCustomProperties();

            try
            {
                var userObjectId = ClaimsHelper.GetUserObjectIdClaim((ClaimsIdentity)HttpContext.User.Identity);

                var results = await Database.GetActivitiesByUserAsync(userObjectId).ConfigureAwait(false);

                Logger.TrackEvent(EventNames.ActivitiesQueriedByUser, eventProps);

                return Ok(results);
            }
            catch (ClaimsValidationException ex)
            {
                eventProps.Add("User.Claims", ex.GetClaims());
                Logger.TrackEvent(EventNames.ClaimsValidationError, eventProps);

                return Unauthorized();
            }
            catch (ModelValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Logger.TrackException(ex);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost()]
        [Route("add")]
        public async Task<ActionResult> AddActivity([FromBody]Activity activity)
        {
            var eventProps = GetDefaultCustomProperties();

            try
            {
                activity.UserObjectId = ClaimsHelper.GetUserObjectIdClaim((ClaimsIdentity)HttpContext.User.Identity);

                await Database.AddActivityAsync(activity).ConfigureAwait(false);

                eventProps.Add("ActivityType", activity.Type.ToString());
                eventProps.Add("ActivityPurpose", activity.Purpose.ToString());
                eventProps.Add("ActivityDate", activity.Date.ToString());

                Logger.TrackEvent(EventNames.NewActivitySubmitted, eventProps);
            }
            catch (ClaimsValidationException ex)
            {
                eventProps.Add("User.Claims", ex.GetClaims());
                Logger.TrackEvent(EventNames.ClaimsValidationError, eventProps);

                return Unauthorized();
            }
            catch (ModelValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Logger.TrackException(ex);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok();
        }

        private Dictionary<string, string> GetDefaultCustomProperties()
        {
            return new Dictionary<string, string>()
            {
                { "User.Name", HttpContext.User.Identity.Name != null ? HttpContext.User.Identity.Name : "Unknown" }
            };
        }
    }
}
