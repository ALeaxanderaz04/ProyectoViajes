using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Viajes.API.models
{
    public class TransportistaViewModel
    {
        public int tran_Id { get; set; }
        public string tran_Nombres { get; set; }
        public string tran_Apellidos { get; set; }
        public string tran_Identidad { get; set; }
        public DateTime tran_FechaNacimiento { get; set; }
        public string tran_Sexo { get; set; }
        public int eciv_Id { get; set; }
        public string muni_Id { get; set; }
        public string tran_DireccionExacta { get; set; }
        public string tran_Telefono { get; set; }
        public decimal tran_PagoKm { get; set; }
        public int tran_UsuCreacion { get; set; }
        public DateTime tran_FechaCreacion { get; set; }
        public int? tran_UsuModificacion { get; set; }
        public DateTime? tran_FechaModificacion { get; set; }
        public bool? tran_Estado { get; set; }
    }
}
