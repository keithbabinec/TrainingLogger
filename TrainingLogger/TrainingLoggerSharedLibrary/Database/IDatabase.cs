using System.Threading.Tasks;
using TrainingLoggerSharedLibrary.Models;

namespace TrainingLoggerSharedLibrary.Database
{
    public interface IDatabase
    {
        Task AddActivityAsync(Activity activity);

        Task<Activities> GetActivitiesByUserAsync(string userObjectId);
    }
}
