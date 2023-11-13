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
    public class UsuarioController : ControllerBase
    {
        private readonly AccesService _accesService;
        private readonly IMapper _mapper;

        public UsuarioController(AccesService accesService, IMapper mapper)
        {
            _accesService = accesService;
            _mapper = mapper;
        }


        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _accesService.ListadoUsuarios();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(UsuarioViewModel usuarios)
        {
            var item = _mapper.Map<tbUsuarios>(usuarios);
            var result = _accesService.EliminarUsuarios(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Create(UsuarioViewModel usuarios)
        {
            var item = _mapper.Map<tbUsuarios>(usuarios);
            var result = _accesService.InsertarUsuarios(item);
            return Ok(result);
        }

        [HttpPost("Editar")]
        public IActionResult Edit(UsuarioViewModel usuarios)
        {
            var item = _mapper.Map<tbUsuarios>(usuarios);
            var result = _accesService.EditarUsuarios(item);
            return Ok(result);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(string id)
        {
            var list = _accesService.BuscarUsuarios(id);
            return Ok(list);
        }

        [HttpPut("IniciarSesion")]
        public IActionResult Login(UsuarioViewModel usuarios)
        {
            var item = _mapper.Map<tbUsuarios>(usuarios);
            var list = _accesService.Login(item);
            return Ok(list);
        }
    }
}
