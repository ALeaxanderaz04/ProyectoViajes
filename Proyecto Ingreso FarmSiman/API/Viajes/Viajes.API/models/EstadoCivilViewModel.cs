using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Viajes.API.models
{
    public class EstadoCivilViewModel
    {
        public int eciv_Id { get; set; }
        public string eciv_Descripcion { get; set; }
        public int eciv_UsuCreacion { get; set; }
        public DateTime eciv_FechaCreacion { get; set; }
        public int? eciv_UsuModificacion { get; set; }
        public DateTime? eciv_FechaModificacion { get; set; }
        public bool? eciv_Estado { get; set; }
    }
}
