using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viajes.Entities.Entities;

namespace Viajes.DataAccess.Repository
{
    public class SucursalRepository : IRepository<tbSucursales, VW_tbSucursales>
    {
        public RequestStatus Delete(tbSucursales item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbSucursales_Eliminar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public VW_tbSucursales Find(string id)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@sucu_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbSucursales>(ScriptDataBase.UDP_tbSucursales_Buscar, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbSucursales item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@sucu_Nombre", item.sucu_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Direccion", item.sucu_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_UsuCreacion", item.sucu_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbSucursales_Insertar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbSucursales> List()
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            return db.Query<VW_tbSucursales>(ScriptDataBase.UDP_tbSucursales_Listado, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbSucursales item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sucu_Nombre", item.sucu_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Direccion", item.sucu_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_UsuModificacion", item.sucu_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbSucursales_Actualizar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        
    }
}
