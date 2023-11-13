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
    public class EstadoCivilController : ControllerBase
    {
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;

        public EstadoCivilController(GeneralService generalService, IMapper mapper)
        {
            _generalService = generalService;
            _mapper = mapper;
        }


        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _generalService.ListadoEstadosCiviles();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(EstadoCivilViewModel estado)
        {
            var item = _mapper.Map<tbEstadosCiviles>(estado);
            var result = _generalService.EliminarEstadosCiviles(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Create(EstadoCivilViewModel estado)
        {
            var item = _mapper.Map<tbEstadosCiviles>(estado);
            var result = _generalService.InsertarEstadosCiviles(item);
            return Ok(result);
        }

        [HttpPost("Editar")]
        public IActionResult Edit(EstadoCivilViewModel estado)
        {
            var item = _mapper.Map<tbEstadosCiviles>(estado);
            var result = _generalService.EditarEstadosCiviles(item);
            return Ok(result);
        }



        [HttpGet("Buscar")]
        public IActionResult Find(string id)
        {
            var list = _generalService.BuscarEstadosCiviles(id);
            return Ok(list);
        }
    }
}
