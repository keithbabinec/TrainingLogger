using System;
using System.Security.Claims;
using TrainingLoggerSharedLibrary.Exceptions;

namespace TrainingLoggerApi
{
    public static class ClaimsHelper
    {
        private const string UserObjectIdClaimName = "http://schemas.microsoft.com/identity/claims/objectidentifier";

        public static Guid GetUserObjectIdClaim(ClaimsIdentity userIdentity)
        {
            if (userIdentity == null)
            {
                throw new ApplicationException("Unable to extract the user object ID claim. The provided user identity was not populated.");
            }

            // find first returns the claim if found, otherwise null.
            // it does not throw if the claim is missing.

            var oidClaim = userIdentity.FindFirst(UserObjectIdClaimName);

            if (oidClaim == null)
            {
                throw new ClaimsValidationException("Unable to extract the user object ID claim. The provided user identity is missing the 'oid' claim.", userIdentity.Claims);
            }
            else
            {
                if (Guid.TryParse(oidClaim.Value, out Guid result))
                {
                    return result;
                }
                else
                {
                    throw new ClaimsValidationException($"Unable to extract the user object ID claim. The 'oid' claim was present, but wasnt in the correct format.", userIdentity.Claims);
                }
            }
        }
    }
}
