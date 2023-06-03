using backend.Validators;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Client
    {
        [Required]
        [StringLength(9, MinimumLength = 9)]
        public string ID { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [IPValidator]
        public string IP { get; set; }
        [Phone]
        public string Phone { get; set; }
    }
}