using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viajes.DataAccess.Repository;
using Viajes.Entities.Entities;

namespace Viajes.BusinessLogic.Service
{
    public class AccesService
    {

        private readonly UsuarioReporitory _usuarioReporitory;
        private readonly RolRepository _rolRepository;

        public AccesService(UsuarioReporitory usuarioReporitory,
                            RolRepository rolRepository)
        {
            _usuarioReporitory = usuarioReporitory;
            _rolRepository = rolRepository;
        }

        #region Usuarios
        public ServiceResult ListadoUsuarios()
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuarioReporitory.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarUsuarios(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _usuarioReporitory.Delete(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarUsuarios(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _usuarioReporitory.Insert(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult EditarUsuarios(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _usuarioReporitory.Update(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public VW_tbUsuarios BuscarUsuarios(string id)
        {
            try
            {
                var list = _usuarioReporitory.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Login
        public VW_tbUsuarios Login(tbUsuarios item)
        {
            try
            {
                var list = _usuarioReporitory.Login(item);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Roles
        public ServiceResult ListadoRoles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public VW_tbRoles BuscarRoles(int? id)
        {
            try
            {
                var list = _rolRepository.Find(id.ToString());
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public ServiceResult InsertarRoles(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _rolRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EditarRoles(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _rolRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }

            }
            catch (Exception)
            {
                throw;
            }
        }

        public ServiceResult EliminarRoles(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _rolRepository.Delete(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }

            }
            catch (Exception)
            {
                throw;
            }
        }

        public ServiceResult InsertarRolesporPantalla(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _rolRepository.InsertPatallasporRol(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ServiceResult ListadoPantallas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.ListPantallas();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult ListadoRolesPantalla(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.FindPantallasRoles(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult PanatllasDiponibles(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.PanatllasDisponibles(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarRolesporPantalla(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _rolRepository.DeleteRolesporPanatlla(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }

            }
            catch (Exception)
            {
                throw;
            }
        }

        public ServiceResult PantallasMenu(int? id, int EsAdmin)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.PantallasMenu(id, EsAdmin);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult AccesoPantall(int esAdmin, int role_Id, int pant_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.AccesoPantallas(esAdmin, role_Id, pant_Id);
                return result.Ok(list);
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion


    }
}
