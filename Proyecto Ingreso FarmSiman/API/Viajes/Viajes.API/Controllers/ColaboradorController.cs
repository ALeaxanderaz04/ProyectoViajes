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
    public class ColaboradorController : ControllerBase
    {
        private readonly ViajeService _viajeService;
        private readonly IMapper _mapper;

        public ColaboradorController(ViajeService viajeService, IMapper mapper)
        {
            _viajeService = viajeService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _viajeService.ListadoColaboradores();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(ColaboradoresViewModel colaboradores)
        {
            var item = _mapper.Map<tbColaboradores>(colaboradores);
            var result = _viajeService.EliminarColaboradores(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Create(ColaboradoresViewModel colaboradores)
        {
            var item = _mapper.Map<tbColaboradores>(colaboradores);
            var result = _viajeService.InsertarColaboradores(item);
            return Ok(result);
        }

        [HttpPost("Editar")]
        public IActionResult Edit(ColaboradoresViewModel colaboradores)
        {
            var item = _mapper.Map<tbColaboradores>(colaboradores);
            var result = _viajeService.EditarColaboradores(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(string id)
        {
            var list = _viajeService.BuscarColaboradores(id);
            return Ok(list);
        }
    }
}
