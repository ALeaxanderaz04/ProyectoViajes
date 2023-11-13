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
    public class ViajesController : ControllerBase
    {
        private readonly ViajeService _viajeService;
        private readonly IMapper _mapper;

        public ViajesController(ViajeService viajeService, IMapper mapper)
        {
            _viajeService = viajeService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _viajeService.ListadoViajes();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(ViajesViewModel viajes)
        {
            var item = _mapper.Map<tbViajes>(viajes);
            var result = _viajeService.EliminarViajes(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Create(ViajesViewModel viajes)
        {
            var item = _mapper.Map<tbViajes>(viajes);
            var result = _viajeService.InsertarViajes(item);
            return Ok(result);
        }

        [HttpPost("Editar")]
        public IActionResult Edit(ViajesViewModel viajes)
        {
            var item = _mapper.Map<tbViajes>(viajes);
            var result = _viajeService.EditarViajes(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(string id)
        {
            var list = _viajeService.BuscarViajes(id);
            return Ok(list);
        }


        [HttpGet("ListadoDetalles")]
        public IActionResult ListDetalles(int id)
        {
            var list = _viajeService.ListadoViajesDetalles(id);
            return Ok(list);
        }

        [HttpPost("InsertarDetalles")]
        public IActionResult CreateDetalles(ViajesDetallesViewModel viajes)
        {
            var item = _mapper.Map<tbViajesDetalles>(viajes);
            var result = _viajeService.InsertarViajesDetalles(item);
            return Ok(result);
        }

        [HttpPost("EliminarDetalles")]
        public IActionResult DeleteDetalles(ViajesDetallesViewModel viajes)
        {
            var item = _mapper.Map<tbViajesDetalles>(viajes);
            var result = _viajeService.EliminarViajesDetalles(item);
            return Ok(result);
        }

    }
}
