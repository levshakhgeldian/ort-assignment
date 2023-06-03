using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.SQL
{
    public class OrtSqlContext : DbContext
    {
        public DbSet<Client> Clients { get; set; }

        public OrtSqlContext(DbContextOptions options) : base(options) { }
    }
}
