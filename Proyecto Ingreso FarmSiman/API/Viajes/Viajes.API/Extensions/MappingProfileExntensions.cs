using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Viajes.API.models;
using Viajes.Entities.Entities;

namespace Viajes.API.Extensions
{
    public class MappingProfileExntensions : Profile
    {
        public MappingProfileExntensions()
        {

            CreateMap<UsuarioViewModel,                             tbUsuarios>().ReverseMap();
            CreateMap<RolViewModel,                                 tbRoles>().ReverseMap();
            CreateMap<PantallaPorRolViewModel,                      tbPantallasPorRoles>().ReverseMap();


            CreateMap<DepartamentoViewmodel,                        tbDepartamentos>().ReverseMap();
            CreateMap<MunicipiosViewModel,                          tbMunicipios>().ReverseMap();
            CreateMap<EstadoCivilViewModel,                         tbEstadosCiviles>().ReverseMap();
            

            CreateMap<ColaboradoresViewModel,                       tbColaboradores>().ReverseMap();
            CreateMap<ColaboradoresPorSucursalViewModel,            tbColaboradoresPorSucursal>().ReverseMap();
            CreateMap<TransportistaViewModel,                       tbTransportistas>().ReverseMap();
            CreateMap<SucursalViewModel,                            tbSucursales>().ReverseMap();
            CreateMap<ViajesViewModel,                              tbViajes>().ReverseMap();
            CreateMap<ViajesDetallesViewModel,                      tbViajesDetalles>().ReverseMap();
        }
    }
}
