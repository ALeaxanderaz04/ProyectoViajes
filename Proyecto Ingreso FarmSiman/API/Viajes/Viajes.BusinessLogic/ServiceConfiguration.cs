using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viajes.BusinessLogic.Service;
using Viajes.DataAccess;
using Viajes.DataAccess.Repository;

namespace Viajes.BusinessLogic
{
    public static class ServiceConfiguration
    {
        public static void DataAccess(this IServiceCollection service, string connectionString)
        {
            service.AddScoped<UsuarioReporitory>();
            service.AddScoped<RolRepository>();


            service.AddScoped<DepartamentosRepository>();
            service.AddScoped<MunicipioRepository>();
            service.AddScoped<EstadoCivilRepository>();


            service.AddScoped<ColaboradoresRepository>();
            service.AddScoped<TransportistasRepository>();
            service.AddScoped<SucursalRepository>();
            service.AddScoped<ViajeRepository>();


            FarmViajesContext.BuildConnectionString(connectionString);
        }

        public static void BusinessLogic(this IServiceCollection service)
        {
            service.AddScoped<AccesService>();
            service.AddScoped<GeneralService>();
            service.AddScoped<ViajeService>();
        }
    }
}
