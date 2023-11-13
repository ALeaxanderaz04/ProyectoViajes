using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viajes.DataAccess.Repository
{
    public class ScriptDataBase
    {

        //----- ACCE ---------

        #region Usuarios
        public static string UDP_tbUsuarios_Listado     = "acce.UDP_tbUsuarios_Index";
        public static string UDP_tbUsuarios_Insertar    = "acce.UDP_tbUsuarios_Insert";
        public static string UDP_tbUsuarios_Actualizar  = "acce.UDP_tbUsuarios_Update";
        public static string UDP_tbUsuarios_Eliminar    = "acce.UDP_tbUsuarios_Delete";
        public static string UDP_tbUsuarios_Buscar      = "acce.UDP_tbUsuarios_Find";
        #endregion

        #region Roles - Pantalla
        public static string UDP_tbRoles_Listado        = "acce.UDP_tbRoles_Index";
        public static string UDP_tbRoles_Insertar       = "acce.UDP_tbRoles_Insert";
        public static string UDP_tbRoles_Actualizar     = "acce.UDP_tbRoles_Update";
        public static string UDP_tbRoles_Eliminar       = "acce.UDP_tbRoles_Delete";
        public static string UDP_tbRoles_Buscar         = "acce.UDP_tbRoles_Find";

        public static string UDP_tbRoles_tbPantallas_Insertar       = "acce.UDP_tbPantallasPorRoles_Insert";
        public static string UDP_tbRoles_tbPantallas_Buscar         = "acce.UDP_tbPantallasPorRoles_Find";
        public static string UDP_tbRoles_tbPantallas_Disponibles    = "acce.UDP_tbPantallasPorRoles_PantallasDisponibles";
        public static string UDP_tbRoles_tbPantallas_Eliminar       = "acce.UDP_tbPantallasPorRoles_Delete";

        public static string UDP_tbPantallas_Listado            = "acce.tbPantallas_Index";
        public static string UDP_AccesoPantalla                 = "acce.UDP_AccesoAPantallas";
        public static string UDP_tbRoles_tbPantallas_Menu       = "acce.tbPantallas_Menu";
        #endregion

        #region Login
        public static string UDP_Login_IniciarSesion    = "acce.UDP_IniciarSesion";
        #endregion

        //----- GRAL ---------

        #region Departamaneto
        public static string UDP_tbDepartamentos_Listado    = "gral.UDP_tbDepartamentos_Index";
        public static string UDP_tbDepartamentos_Insertar   = "gral.UDP_tbDepartamentos_Insert";
        public static string UDP_tbDepartamentos_Actualizar = "gral.UDP_tbDepartamentos_Update";
        public static string UDP_tbDepartamentos_Eliminar   = "gral.UDP_tbDepartamentos_Delete";
        public static string UDP_tbDepartamentos_Buscar     = "gral.UDP_tbDepartamentos_Find";
        #endregion

        #region Estados Civiles
        public static string UDP_tbEstadosCiviles_Listado       = "gral.UDP_tbEstadosCiviles_Index";
        public static string UDP_tbEstadosCiviles_Insertar      = "gral.UDP_tbEstadosCiviles_Insert";
        public static string UDP_tbEstadosCiviles_Actualizar    = "gral.UDP_tbEstadosCiviles_Update";
        public static string UDP_tbEstadosCiviles_Eliminar      = "gral.UDP_tbEstadosCiviles_Delete";
        public static string UDP_tbEstadosCiviles_Buscar        = "gral.UDP_tbEstadosCiviles_Find";
        #endregion


        #region Municipios
        public static string UDP_tbMunicipios_Listado       = "gral.UDP_tbMunicipios_Index";
        public static string UDP_tbMunicipios_Insertar      = "gral.UDP_tbMunicipios_Insert";
        public static string UDP_tbMunicipios_Actualizar    = "gral.UDP_tbMunicipios_Update";
        public static string UDP_tbMunicipios_Eliminar      = "gral.UDP_tbMunicipios_Delete";
        public static string UDP_tbMunicipios_Buscar        = "gral.UDP_tbMunicipios_Find";

        public static string UDP_tbMunicipios_DDL           = "gral.tbMunicipios_DDL";
        #endregion


        //----- VIAJ ---------

        #region Colaboradores
        public static string UDP_tbColaboradores_Listado    = "viaj.UDP_tbColaboradores_Index";
        public static string UDP_tbColaboradores_Insertar   = "viaj.UDP_tbColaboradores_Insert";
        public static string UDP_tbColaboradores_Actualizar = "viaj.UDP_tbColaboradores_Update";
        public static string UDP_tbColaboradores_Eliminar   = "viaj.UDP_tbColaboradores_Delete";
        public static string UDP_tbColaboradores_Buscar     = "viaj.UDP_tbColaboradores_Find";
        #endregion

        #region Transportistas
        public static string UDP_tbTransportistas_Listado    = "viaj.UDP_tbTransportistas_Index";
        public static string UDP_tbTransportistas_Insertar   = "viaj.UDP_tbTransportistas_Insert";
        public static string UDP_tbTransportistas_Actualizar = "viaj.UDP_tbTransportistas_Update";
        public static string UDP_tbTransportistas_Eliminar   = "viaj.UDP_tbTransportistas_Delete";
        public static string UDP_tbTransportistas_Buscar     = "viaj.UDP_tbTransportistas_Find";
        #endregion

        #region Sucursales
        public static string UDP_tbSucursales_Listado       = "viaj.UDP_tbSucursales_Index";
        public static string UDP_tbSucursales_Insertar      = "viaj.UDP_tbSucursales_Insert";
        public static string UDP_tbSucursales_Actualizar    = "viaj.UDP_tbSucursales_Update";
        public static string UDP_tbSucursales_Eliminar      = "viaj.UDP_tbSucursales_Delete";
        public static string UDP_tbSucursales_Buscar        = "viaj.UDP_tbSucursales_Find";
        #endregion

        #region Viajes - Viajes Detalles
        public static string UDP_tbViajes_Listado       = "viaj.UDP_tbViajes_Index";
        public static string UDP_tbViajes_Insertar      = "viaj.UDP_tbViajes_Insert";
        public static string UDP_tbViajes_Actualizar    = "viaj.UDP_tbViajes_Update";
        public static string UDP_tbViajes_Eliminar      = "viaj.UDP_tbViajes_Delete";
        public static string UDP_tbViajes_Buscar        = "viaj.UDP_tbViajes_Find";

        public static string UDP_tbViajesDetalles_Index     = "viaj.UDP_tbViajesDetalles_Index";
        public static string UDP_tbViajesDetalles_Insertar  = "viaj.UDP_tbViajesDetalles_Insert";
        public static string UDP_tbViajesDetalles_Eliminar  = "viaj.UDP_tbViajesDetalles_Delete";
        #endregion
        

    }
}
