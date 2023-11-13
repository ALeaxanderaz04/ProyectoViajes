using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Viajes.API.models;
using Viajes.BusinessLogic.Service;
using Viajes.Entities.Entities;

namespace Viajes.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PantallaPorRolController : ControllerBase
    {
        private readonly AccesService _accesService;
        private readonly IMapper _mapper;

        public PantallaPorRolController(AccesService accesService, IMapper mapper)
        {
            _accesService = accesService;
            _mapper = mapper;
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(PantallaPorRolViewModel rol)
        {
            var item = _mapper.Map<tbPantallasPorRoles>(rol);
            var response = _accesService.InsertarRolesporPantalla(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _accesService.ListadoRolesPantalla(id);
            return Ok(list);
        }

        [HttpGet("BuscarPantallasdisponibles")]
        public IActionResult PanatallasDisponibles(int? id)
        {
            var list = _accesService.PanatllasDiponibles(id);
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(PantallaPorRolViewModel rol)
        {
            var item = _mapper.Map<tbPantallasPorRoles>(rol);
            var response = _accesService.EliminarRolesporPantalla(item);
            return Ok(response);
        }
    }
}
