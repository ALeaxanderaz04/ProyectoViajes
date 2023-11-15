using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viajes.DataAccess.Repository;
using Viajes.Entities.Entities;

namespace Viajes.BusinessLogic.Service
{
    public class ViajeService
    {
        private readonly ColaboradoresRepository _colaboradoresRepository;
        private readonly TransportistasRepository _transportistasRepository;
        private readonly SucursalRepository _sucursalRepository;
        private readonly ViajeRepository _viajeRepository;

        public ViajeService(ColaboradoresRepository colaboradoresRepository,
                            TransportistasRepository transportistasRepository,
                            SucursalRepository sucursalRepository,
                            ViajeRepository viajeRepository)
        {
            _colaboradoresRepository = colaboradoresRepository;
            _transportistasRepository = transportistasRepository;
            _sucursalRepository = sucursalRepository;
            _viajeRepository = viajeRepository;
        }

        #region Colaboradoes
        public ServiceResult ListadoColaboradores()
        {
            var result = new ServiceResult();
            try
            {
                var list = _colaboradoresRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarColaboradores(tbColaboradores item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _colaboradoresRepository.Delete(item);
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

        public ServiceResult InsertarColaboradores(tbColaboradores item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _colaboradoresRepository.Insert(item);
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
        public ServiceResult EditarColaboradores(tbColaboradores item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _colaboradoresRepository.Update(item);
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

        public VW_tbColaboradores BuscarColaboradores(string id)
        {
            try
            {
                var list = _colaboradoresRepository.Find(id);
                return list;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public ServiceResult ListadoColaboradoresDisponibles(int Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _colaboradoresRepository.Available(Id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult ListadoColaboradoresDisponiblesViajar(int Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _colaboradoresRepository.AvailableTravel(Id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        #endregion

        #region Transportistas
        public ServiceResult ListadoTransportistas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _transportistasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarTransportistas(tbTransportistas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _transportistasRepository.Delete(item);
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

        public ServiceResult InsertarTransportistas(tbTransportistas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _transportistasRepository.Insert(item);
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
        public ServiceResult EditarTransportistas(tbTransportistas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _transportistasRepository.Update(item);
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

        public VW_tbTransportistas BuscarTransportistas(string id)
        {
            try
            {
                var list = _transportistasRepository.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Sucursales
        public ServiceResult ListadoSucursales()
        {
            var result = new ServiceResult();
            try
            {
                var list = _sucursalRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarSucursales(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _sucursalRepository.Delete(item);
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

        public ServiceResult InsertarSucursales(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _sucursalRepository.Insert(item);
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
        public ServiceResult EditarSucursales(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _sucursalRepository.Update(item);
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

        public VW_tbSucursales BuscarSucursales(string id)
        {
            try
            {
                var list = _sucursalRepository.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public ServiceResult ListadoColaboradoresPorSucursal(int Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _sucursalRepository.ListColaboradoresPorSucursal(Id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarColaboradoresPorSucursal(tbColaboradoresPorSucursal item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _sucursalRepository.InsertColaboradoresPorSucursal(item);
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

        public ServiceResult EliminarColaboradoresPorSucursal(tbColaboradoresPorSucursal item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _sucursalRepository.DeleteColaboradoresPorSucursal(item);
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

        public ServiceResult Kilometraje(int sucu_Id, int cola_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _sucursalRepository.Kilometraje(sucu_Id, cola_Id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        #endregion

        #region Viajes
        public ServiceResult ListadoViajes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _viajeRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarViajes(tbViajes item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _viajeRepository.Delete(item);
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

        public ServiceResult InsertarViajes(tbViajes item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _viajeRepository.Insert(item);
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
        public ServiceResult EditarViajes(tbViajes item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _viajeRepository.Update(item);
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

        public VW_tbViajes BuscarViajes(string id)
        {
            try
            {
                var list = _viajeRepository.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public ServiceResult ListadoViajesDetalles(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _viajeRepository.ListDetalles(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarViajesDetalles(tbViajesDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _viajeRepository.InsertDetalles(item);
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

        public ServiceResult EliminarViajesDetalles(tbViajesDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _viajeRepository.DeleteDetalles(item);
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

        public ServiceResult Pago(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _viajeRepository.PagoTransportista(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult Reporte(int tran_Id, DateTime FechaInicio, DateTime FechaFin)
        {
            var result = new ServiceResult();
            try
            {
                var list = _viajeRepository.Report(tran_Id, FechaInicio, FechaFin);
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
