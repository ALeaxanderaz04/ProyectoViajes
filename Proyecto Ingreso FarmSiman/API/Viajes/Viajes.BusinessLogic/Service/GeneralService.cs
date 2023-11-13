using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viajes.DataAccess.Repository;
using Viajes.Entities.Entities;

namespace Viajes.BusinessLogic.Service
{
    public class GeneralService
    {
        private readonly DepartamentosRepository _departamentosRepository;
        private readonly MunicipioRepository _municipioRepository;
        private readonly EstadoCivilRepository _estadoCivilRepository;

        public GeneralService ( DepartamentosRepository departamentosRepository,
                                MunicipioRepository municipioRepository,
                                EstadoCivilRepository estadoCivilRepository)
        {
            _departamentosRepository = departamentosRepository;
            _municipioRepository = municipioRepository;
            _estadoCivilRepository = estadoCivilRepository;
        }

        #region Departamento
        public ServiceResult ListadoDepartamentos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _departamentosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarDepartamentos(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _departamentosRepository.Delete(item);
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

        public ServiceResult InsertarDepartamentos(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _departamentosRepository.Insert(item);
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
        public ServiceResult EditarDepartamentos(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _departamentosRepository.Delete(item);
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

        public VW_tbDepartamentos BuscarDepartamentos(string id)
        {
            try
            {
                var list = _departamentosRepository.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Estados Civiles
        public ServiceResult ListadoEstadosCiviles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoCivilRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _estadoCivilRepository.Delete(item);
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

        public ServiceResult InsertarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _estadoCivilRepository.Insert(item);
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
        public ServiceResult EditarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _estadoCivilRepository.Update(item);
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

        public VW_tbEstadosCiviles BuscarEstadosCiviles(string id)
        {
            try
            {
                var list = _estadoCivilRepository.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion


        #region Municipios
        public ServiceResult ListadoMunicipios()
        {
            var result = new ServiceResult();
            try
            {
                var list = _municipioRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarMunicipios(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _municipioRepository.Delete(item);
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

        public ServiceResult InsertarMunicipios(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _municipioRepository.Insert(item);
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
        public ServiceResult EditarMunicipios(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _municipioRepository.Delete(item);
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

        public VW_tbMunicipios BuscarMunicipios(string id)
        {
            try
            {
                var list = _municipioRepository.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public ServiceResult MunicipiosPorDepartamento(string id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _municipioRepository.MunicipiosPorDepartamento(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        #endregion

    }
}
