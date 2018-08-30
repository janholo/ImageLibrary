using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FileSystemApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Hosting.Server.Features;

namespace FileSystemApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddSingleton<PreviewService>();
            services.AddSingleton<FileSystemService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILogger<Startup> logger)
        {
            logger.LogInformation("Hosting environment: " + env.EnvironmentName);
            logger.LogInformation("Content root path: " + env.ContentRootPath);
            IServerAddressesFeature feature = app.ServerFeatures.FirstOrDefault(s => s.Value is IServerAddressesFeature).Value as IServerAddressesFeature;
            if(feature != null)
            {
                foreach(var address in feature.Addresses)
                {
                    logger.LogInformation("Now listening on: " + address);
                }
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}
