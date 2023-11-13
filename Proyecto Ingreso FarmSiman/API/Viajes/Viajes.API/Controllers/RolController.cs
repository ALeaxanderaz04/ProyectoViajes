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
    public class RolController : ControllerBase
    {
        private readonly AccesService _accesService;
        private readonly IMapper _mapper;

        public RolController(AccesService accesService, IMapper mapper)
        {
            _accesService = accesService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _accesService.ListadoRoles();
            return Ok(list);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _accesService.BuscarRoles(id);
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(RolViewModel rol)
        {
            var item = _mapper.Map<tbRoles>(rol);
            var result = _accesService.EliminarRoles(item);
            return Ok(result);
        }


        [HttpPost("Insertar")]
        public IActionResult Insert(RolViewModel rol)
        {

            var item = _mapper.Map<tbRoles>(rol);
            var response = _accesService.InsertarRoles(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(RolViewModel rol)
        {

            var item = _mapper.Map<tbRoles>(rol);
            var response = _accesService.EditarRoles(item);
            return Ok(response);
        }

        [HttpGet("ListadoPantallas")]
        public IActionResult ListPantallas()
        {
            var list = _accesService.ListadoPantallas();
            return Ok(list);
        }

        [HttpGet("PantallaMenu")]
        public IActionResult PantallasMenu(int? id, int EsAdmin)
        {
            var list = _accesService.PantallasMenu(id, EsAdmin);
            return Ok(list);
        }

        [HttpPut("AccesoPantalla")]
        public IActionResult FindPrice(int esAdmin, int role_Id, int pant_Id)
        {
            var list = _accesService.AccesoPantall(esAdmin, role_Id, pant_Id);
            return Ok(list);
        }


    }
}
