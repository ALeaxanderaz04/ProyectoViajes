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
    public class ViajeRepository : IRepository<tbViajes, VW_tbViajes>
    {
        public RequestStatus Delete(tbViajes item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@viaj_Id", item.viaj_Id, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbViajes_Eliminar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public VW_tbViajes Find(string id)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@viaj_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbViajes>(ScriptDataBase.UDP_tbViajes_Buscar, parametros, commandType: System.Data.CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbViajes item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@tran_Id", item.tran_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@viaj_UsuCreacion", item.viaj_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbViajes_Insertar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbViajes> List()
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            return db.Query<VW_tbViajes>(ScriptDataBase.UDP_tbViajes_Listado, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbViajes item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@viaj_Id", item.viaj_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tran_Id", item.tran_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@viaj_UsuModificacion", item.viaj_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbViajes_Actualizar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }


        public RequestStatus InsertDetalles(tbViajesDetalles item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@viaj_Id", item.viaj_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cola_Id", item.cola_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@vide_UsuCreacion", item.vide_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbViajesDetalles_Insertar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }

        public IEnumerable<VW_tbViajesDetalles> ListDetalles(int id)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@viaj_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.Query<VW_tbViajesDetalles>(ScriptDataBase.UDP_tbViajes_Listado, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus DeleteDetalles(tbViajesDetalles item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@vide_Id", item.viaj_Id, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbViajesDetalles_Eliminar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }
    }
}
