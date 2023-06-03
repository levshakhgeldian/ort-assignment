using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace backend.Validators
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
    public class IPValidator : DataTypeAttribute
    {
        private const string IPV4_MATCH_REGEX = @"^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$";

        public IPValidator() : base("IP") { }

        public override bool IsValid(object? value)
        {
            if (value == null)
                return false;

            var str = value.ToString();
            if (string.IsNullOrWhiteSpace(str))
                return false;

            return Regex.Match(str, IPV4_MATCH_REGEX).Success;
        }
    }
}