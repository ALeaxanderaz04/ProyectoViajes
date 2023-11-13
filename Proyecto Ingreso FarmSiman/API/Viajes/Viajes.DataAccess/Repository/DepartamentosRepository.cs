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
    public class DepartamentosRepository : IRepository<tbDepartamentos, VW_tbDepartamentos>
    {
        public RequestStatus Delete(tbDepartamentos item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@depa_Id", item.depa_Id, DbType.String, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbDepartamentos_Eliminar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public VW_tbDepartamentos Find(string id)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@depa_Id", id, DbType.String, ParameterDirection.Input);

            return db.QueryFirst<VW_tbDepartamentos>(ScriptDataBase.UDP_tbDepartamentos_Buscar, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbDepartamentos item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus(); 
            parametros.Add("@depa_Id", item.depa_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@depa_Nombre", item.depa_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@depa_UsuCreacion", item.depa_UsuCreacion, DbType.String, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbDepartamentos_Insertar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbDepartamentos> List()
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            return db.Query<VW_tbDepartamentos>(ScriptDataBase.UDP_tbDepartamentos_Listado, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbDepartamentos item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@depa_Id", item.depa_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@depa_Nombre", item.depa_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@depa_UsuModificacion", item.depa_UsuModificacion, DbType.String, ParameterDirection.Input);


            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbDepartamentos_Actualizar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }
    }
}
