using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Viajes.API.models
{
    public class ColaboradoresPorSucursalViewModel
    {
        public int cosu_Id { get; set; }
        public int? sucu_Id { get; set; }
        public int? cola_Id { get; set; }
        public decimal cosu_DistanciaSucursal { get; set; }
        public int cosu_UsuCreacion { get; set; }
        public DateTime? cosu_FechaCreacion { get; set; }
        public int? cosu_UsuModificacion { get; set; }
        public DateTime? cosu_FechaModificacion { get; set; }
        public bool? cosu_Estado { get; set; }
    }
}
