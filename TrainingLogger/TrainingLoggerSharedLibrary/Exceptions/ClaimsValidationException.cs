using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Security.Claims;
using System.Text;

namespace TrainingLoggerSharedLibrary.Exceptions
{
    public class ClaimsValidationException : Exception
    {
        private IEnumerable<Claim> Claims;

        public string GetClaims()
        {
            var detectedClaims = new StringBuilder();

            foreach (var claim in Claims)
            {
                detectedClaims.AppendLine($"{claim.Issuer}:{claim.Type}:{claim.Value}");
            }

            return detectedClaims.ToString();
        }

        public ClaimsValidationException()
        {
        }

        public ClaimsValidationException(string message, IEnumerable<Claim> claims) : base(message)
        {
            Claims = claims;
        }

        public ClaimsValidationException(string message, Exception innerException, IEnumerable<Claim> claims) : base(message, innerException)
        {
            Claims = claims;
        }

        protected ClaimsValidationException(SerializationInfo info, StreamingContext context, IEnumerable<Claim> claims) : base(info, context)
        {
            Claims = claims;
        }
    }
}
