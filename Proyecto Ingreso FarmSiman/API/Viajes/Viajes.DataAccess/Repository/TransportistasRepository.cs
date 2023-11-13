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
    public class TransportistasRepository : IRepository<tbTransportistas, VW_tbTransportistas>
    {
        public RequestStatus Delete(tbTransportistas item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@tran_Id", item.tran_Id, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbTransportistas_Eliminar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public VW_tbTransportistas Find(string id)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@tran_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbTransportistas>(ScriptDataBase.UDP_tbTransportistas_Buscar, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbTransportistas item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@tran_Nombres", item.tran_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@tran_Apellidos", item.tran_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@tran_Identidad", item.tran_Identidad, DbType.String, ParameterDirection.Input);
            parametros.Add("@tran_FechaNacimiento", item.tran_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@tran_Sexo", item.tran_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@tran_DireccionExacta", item.tran_DireccionExacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@tran_Telefono", item.tran_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@tran_PagoKm", item.tran_PagoKm, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@tran_UsuCreacion", item.tran_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbTransportistas_Insertar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbTransportistas> List()
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            return db.Query<VW_tbTransportistas>(ScriptDataBase.UDP_tbTransportistas_Listado, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbTransportistas item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@tran_Id", item.tran_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tran_Nombres", item.tran_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@tran_Apellidos", item.tran_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@tran_Identidad", item.tran_Identidad, DbType.String, ParameterDirection.Input);
            parametros.Add("@tran_FechaNacimiento", item.tran_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@tran_Sexo", item.tran_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@tran_DireccionExacta", item.tran_DireccionExacta, DbType.String, ParameterDirection.Input);
            parametros.Add("@tran_Telefono", item.tran_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@tran_PagoKm", item.tran_PagoKm, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@tran_UsuModificacion", item.tran_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbTransportistas_Actualizar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }
    }
}
