using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Viajes.API.models
{
    public class ViajesDetallesViewModel
    {
        public int vide_Id { get; set; }
        public int viaj_Id { get; set; }
        public int cola_Id { get; set; }
        public int vide_UsuCreacion { get; set; }
        public DateTime vide_FechaCreacion { get; set; }
        public int? vide_UsuModificacion { get; set; }
        public DateTime? vide_FechaModificacion { get; set; }
        public bool? vide_Estado { get; set; }
    }
}
