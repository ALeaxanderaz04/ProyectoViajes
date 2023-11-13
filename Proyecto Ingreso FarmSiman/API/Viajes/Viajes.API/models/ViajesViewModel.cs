using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Viajes.API.models
{
    public class ViajesViewModel
    {
        public int viaj_Id { get; set; }
        public int tran_Id { get; set; }
        public int viaj_UsuCreacion { get; set; }
        public DateTime viaj_FechaCreacion { get; set; }
        public int? viaj_UsuModificacion { get; set; }
        public DateTime? viaj_FechaModificacion { get; set; }
        public bool? viaj_Estado { get; set; }
    }
}
