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
    public class ColaboradoresRepository : IRepository<tbColaboradores, VW_tbColaboradores>
    {
        public RequestStatus Delete(tbColaboradores item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@cola_Id", item.cola_Id, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbColaboradores_Eliminar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public VW_tbColaboradores Find(string id)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@cola_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbColaboradores>(ScriptDataBase.UDP_tbColaboradores_Buscar, parametros, commandType: System.Data.CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbColaboradores item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@cola_Nombres", item.cola_Nombres,      DbType.String, ParameterDirection.Input);
            parametros.Add("@cola_Apellidos", item.cola_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@cola_Identidad", item.cola_Identidad, DbType.String, ParameterDirection.Input);
            parametros.Add("@cola_FechaNacimiento", item.cola_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@cola_Sexo", item.cola_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@cola_DireccionExacta", item.cola_DireccionExacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@cola_Telefono", item.cola_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cola_DistanciaSucursal", item.cola_DistanciaSucursal, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@cola_UsuCreacion", item.cola_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbColaboradores_Insertar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbColaboradores> List()
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            return db.Query<VW_tbColaboradores>(ScriptDataBase.UDP_tbColaboradores_Listado, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbColaboradores item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@cola_Id", item.cola_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cola_Nombres", item.cola_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@cola_Apellidos", item.cola_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@cola_Identidad", item.cola_Identidad, DbType.String, ParameterDirection.Input);
            parametros.Add("@cola_FechaNacimiento", item.cola_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@cola_Sexo", item.cola_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@cola_DireccionExacta", item.cola_DireccionExacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@cola_Telefono", item.cola_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cola_DistanciaSucursal", item.cola_DistanciaSucursal, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@cola_UsuModificacion", item.cola_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbColaboradores_Actualizar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }
    }
}
