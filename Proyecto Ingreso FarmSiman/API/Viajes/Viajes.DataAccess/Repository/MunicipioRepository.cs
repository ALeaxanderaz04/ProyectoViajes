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
    public class MunicipioRepository : IRepository<tbMunicipios, VW_tbMunicipios>
    {
        public RequestStatus Delete(tbMunicipios item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbMunicipios_Eliminar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;

        }

        public VW_tbMunicipios Find(string id)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@muni_Id", id, DbType.String, ParameterDirection.Input);

            return db.QueryFirst<VW_tbMunicipios>(ScriptDataBase.UDP_tbMunicipios_Buscar, parametros, commandType: System.Data.CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbMunicipios item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Nombre", item.muni_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@depa_Id", item.depa_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_UsuCreacion", item.muni_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbMunicipios_Insertar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;

        }

        public IEnumerable<VW_tbMunicipios> List()
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            return db.Query<VW_tbMunicipios>(ScriptDataBase.UDP_tbMunicipios_Listado, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMunicipios item)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            RequestStatus result = new RequestStatus();
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Nombre", item.muni_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@depa_Id", item.depa_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_UsuModificacion", item.muni_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptDataBase.UDP_tbMunicipios_Actualizar, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }


        public IEnumerable<VW_tbMunicipios> MunicipiosPorDepartamento(string id)
        {
            using var db = new SqlConnection(FarmViajesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@depa_Id", id, DbType.String, ParameterDirection.Input);
            RequestStatus result = new RequestStatus();
            return db.Query<VW_tbMunicipios>(ScriptDataBase.UDP_tbMunicipios_DDL, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
