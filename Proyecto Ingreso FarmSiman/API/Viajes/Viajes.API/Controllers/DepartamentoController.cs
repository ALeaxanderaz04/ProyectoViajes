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
    public class DepartamentoController : ControllerBase
    {
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;

        public DepartamentoController(GeneralService generalService, IMapper mapper)
        {
            _generalService = generalService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _generalService.ListadoDepartamentos();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(DepartamentoViewmodel departamento)
        {
            var item = _mapper.Map<tbDepartamentos>(departamento);
            var result = _generalService.EliminarDepartamentos(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Create(DepartamentoViewmodel departamento)
        {
            var item = _mapper.Map<tbDepartamentos>(departamento);
            var result = _generalService.InsertarDepartamentos(item);
            return Ok(result);
        }

        [HttpPost("Editar")]
        public IActionResult Edit(DepartamentoViewmodel departamento)
        {
            var item = _mapper.Map<tbDepartamentos>(departamento);
            var result = _generalService.EditarDepartamentos(item);
            return Ok(result);
        }



        [HttpGet("Buscar")]
        public IActionResult Find(string id)
        {
            var list = _generalService.BuscarDepartamentos(id);
            return Ok(list);
        }
    }
}
