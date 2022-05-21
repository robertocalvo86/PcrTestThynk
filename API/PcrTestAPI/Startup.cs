using PcrTestAPI.Models.Contexts;
using PcrTestAPI.Models.DataAccesses;
using PcrTestAPI.Logger;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IO;
using NLog;
using System;
using Microsoft.OpenApi.Models;

namespace PcrTestAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("MzU5MDE5QDMxMzgyZTMzMmUzMGM4YW5jNmtUWGQ2bTFCTlF1TitoWktEWGplcGc4K3ZrM0loWVVVSHpTNlE9");
        }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<PcrTestAPI.AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<PcrTestAPI.AppSettings>();

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins(appSettings.Origin)
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    //.WithMethods("OPTIONS")
                    //.WithHeaders("Authorization", "Content-Type");

                });
            });
            services.AddMvc();
            services.AddControllers();

            services.AddDbContext<DBContext>(opt =>
            opt.UseSqlServer("Data Source=localhost;Initial Catalog=ThynkTest_PCR;Integrated Security=True"));

            //Add ASP.NET Core Identity Services
            //services.AddEntityFrameworkStores<DBContext>();

                    //.AddIdentity<User, IdentityRole>()
                    //.AddSignInManager<SignInManager<User>>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.Secret));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(opt =>
                    {
                        opt.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = key,
                            ValidateAudience = false,
                            ValidateIssuer = false
                        };
                    });
                           

            //Modifico le regole di default della password
            services.Configure<IdentityOptions>(options =>
            {
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(2);
                options.Lockout.MaxFailedAccessAttempts = 3;
                options.Lockout.AllowedForNewUsers = true;

                //options.Password.RequiredLength = 10;
                //options.Password.RequiredUniqueChars = 3;
            });

            services.AddScoped<BookingDA>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",
                    new OpenApiInfo
                    {
                        Title = "PcrTestAPI - V1",
                        Version = "v1"
                    }
                 );

                var filePath = Path.Combine(System.AppContext.BaseDirectory, "PcrTestAPI.xml");
                c.IncludeXmlComments(filePath);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthentication();

            UpdateDatabase(app);

            //IdentityTablesInizializer.SeedData(userManager, roleManager);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();
            if (env.IsDevelopment())
            {
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "PcrTestAPI V1");
                    c.RoutePrefix = string.Empty;
                });
            }
            else
            {
                //app.UseSwagger(c => {
                //    c.RouteTemplate = "swagger/{documentName}/swagger.json";
                //});
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/api/swagger/v1/swagger.json", "PcrTestAPI V1");
                    //c.RoutePrefix = "api";
                });
            }
        }

        private static void UpdateDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<DBContext>())
                {
                    context.Database.Migrate();
                }
            }
        }
    }
}
