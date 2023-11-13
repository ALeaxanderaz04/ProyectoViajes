using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Viajes.API.models
{
    public class ColaboradoresViewModel
    {

        public int cola_Id { get; set; }
        public string cola_Nombres { get; set; }
        public string cola_Apellidos { get; set; }
        public string cola_Identidad { get; set; }
        public DateTime cola_FechaNacimiento { get; set; }
        public string cola_Sexo { get; set; }
        public int eciv_Id { get; set; }
        public string muni_Id { get; set; }
        public string cola_DireccionExacta { get; set; }
        public string cola_Telefono { get; set; }
        public int sucu_Id { get; set; }
        public decimal cola_DistanciaSucursal { get; set; }
        public int cola_UsuCreacion { get; set; }
        public DateTime cola_FechaCreacion { get; set; }
        public int? cola_UsuModificacion { get; set; }
        public DateTime? cola_FechaModificacion { get; set; }
        public bool? cola_Estado { get; set; }

    }
}
