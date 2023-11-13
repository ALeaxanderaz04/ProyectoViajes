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
    public class MunicipioController : ControllerBase
    {
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;

        public MunicipioController(GeneralService generalService, IMapper mapper)
        {
            _generalService = generalService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _generalService.ListadoMunicipios();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(MunicipiosViewModel municipio)
        {
            var item = _mapper.Map<tbMunicipios>(municipio);
            var result = _generalService.EliminarMunicipios(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Create(MunicipiosViewModel municipio)
        {
            var item = _mapper.Map<tbMunicipios>(municipio);
            var result = _generalService.InsertarMunicipios(item);
            return Ok(result);
        }

        [HttpPost("Editar")]
        public IActionResult Edit(MunicipiosViewModel municipio)
        {
            var item = _mapper.Map<tbMunicipios>(municipio);
            var result = _generalService.EditarMunicipios(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(string id)
        {
            var list = _generalService.BuscarMunicipios(id);
            return Ok(list);
        }

        [HttpGet("Municipios_DDL")]
        public IActionResult MunicipiosPorDepartamento(string id)
        {
            var list = _generalService.MunicipiosPorDepartamento(id);
            return Ok(list);
        }

    }
}
