using backend.Models;
using backend.Services;
using backend.Services.Interfaces;
using backend.Services.SQL;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Logging.AddConsole();

            ConfigureServices(builder.Configuration, builder.Services);

            var app = builder.Build();
            ConfigurePipeline(app);
            app.Run();
        }

        public static void ConfigureServices(ConfigurationManager configuration, IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen();

            services.AddDbContext<OrtSqlContext>(o => o.UseSqlServer(configuration.GetConnectionString("OrtDB")));

            services.AddTransient<IClientRepository, ClientRepository>();
            services.AddTransient<ISearchContext<Client>, ClientSearchContext>();

            services.AddCors(options => options.AddDefaultPolicy(policy => policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()));
        }

        public static void ConfigurePipeline(WebApplication app)
        {
            app.UseCors();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
        }
    }
}