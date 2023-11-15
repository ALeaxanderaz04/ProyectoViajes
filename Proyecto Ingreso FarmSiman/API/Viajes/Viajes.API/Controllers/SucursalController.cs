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
    public class SucursalController : ControllerBase
    {
        private readonly ViajeService _viajeService;
        private readonly IMapper _mapper;

        public SucursalController(ViajeService viajeService, IMapper mapper)
        {
            _viajeService = viajeService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _viajeService.ListadoSucursales();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(SucursalViewModel sucursal)
        {
            var item = _mapper.Map<tbSucursales>(sucursal);
            var result = _viajeService.EliminarSucursales(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Create(SucursalViewModel colaboradores)
        {
            var item = _mapper.Map<tbSucursales>(colaboradores);
            var result = _viajeService.InsertarSucursales(item);
            return Ok(result);
        }

        [HttpPost("Editar")]
        public IActionResult Edit(SucursalViewModel colaboradores)
        {
            var item = _mapper.Map<tbSucursales>(colaboradores);
            var result = _viajeService.EditarSucursales(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(string id)
        {
            var list = _viajeService.BuscarSucursales(id);
            return Ok(list);
        }

        [HttpGet("ListadoColaboradoresPorSucursal")]
        public IActionResult ListColaboradoresPorSucursal(int Id)
        {
            var list = _viajeService.ListadoColaboradoresPorSucursal(Id);
            return Ok(list);
        }


        [HttpPost("InsertarColaboradoresPorSucursal")]
        public IActionResult InsertColaboradoresPorSucursal(ColaboradoresPorSucursalViewModel colaboradores)
        {
            var item = _mapper.Map<tbColaboradoresPorSucursal>(colaboradores);
            var result = _viajeService.InsertarColaboradoresPorSucursal(item);
            return Ok(result);
        }

        [HttpPost("EliminarColaboradoresPorSucursal")]
        public IActionResult DeletColaboradoresPorSucursal(ColaboradoresPorSucursalViewModel colaboradores)
        {
            var item = _mapper.Map<tbColaboradoresPorSucursal>(colaboradores);
            var result = _viajeService.EliminarColaboradoresPorSucursal(item);
            return Ok(result);
        }

        [HttpGet("Kilometraje")]
        public IActionResult Kilometraje(int sucu_Id, int cola_Id)
        {
            var list = _viajeService.Kilometraje(sucu_Id, cola_Id);
            return Ok(list);
        }
    }
}
