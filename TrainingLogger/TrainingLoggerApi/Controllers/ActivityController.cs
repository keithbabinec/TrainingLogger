using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace TrainingLoggerApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivityController : ControllerBase
    {
        private readonly ILogger<ActivityController> _logger;

        public ActivityController(ILogger<ActivityController> logger)
        {
            _logger = logger;
        }
    }
}
