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
    public class TransportistaController : ControllerBase
    {
        private readonly ViajeService _viajeService;
        private readonly IMapper _mapper;

        public TransportistaController(ViajeService viajeService, IMapper mapper)
        {
            _viajeService = viajeService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _viajeService.ListadoTransportistas();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(TransportistaViewModel transportrsta)
        {
            var item = _mapper.Map<tbTransportistas>(transportrsta);
            var result = _viajeService.EliminarTransportistas(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Create(TransportistaViewModel transportrsta)
        {
            var item = _mapper.Map<tbTransportistas>(transportrsta);
            var result = _viajeService.InsertarTransportistas(item);
            return Ok(result);
        }

        [HttpPost("Editar")]
        public IActionResult Edit(TransportistaViewModel transportrsta)
        {
            var item = _mapper.Map<tbTransportistas>(transportrsta);
            var result = _viajeService.EditarTransportistas(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(string id)
        {
            var list = _viajeService.BuscarTransportistas(id);
            return Ok(list);
        }
    }
}
