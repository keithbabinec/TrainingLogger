using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace TrainingLoggerApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize("TrainingLoggerUser")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly ILogger<ActivityController> Logger;

        public readonly ConfigHelper Config;

        public ActivityController(ILogger<ActivityController> logger, ConfigHelper config)
        {
            Logger = logger;
            Config = config;
        }
    }
}
