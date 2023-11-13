﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Viajes.Entities.Entities
{
    public partial class tbMunicipios
    {
        public tbMunicipios()
        {
            tbColaboradores = new HashSet<tbColaboradores>();
            tbSucursales = new HashSet<tbSucursales>();
            tbTransportistas = new HashSet<tbTransportistas>();
        }

        public string muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public string depa_Id { get; set; }
        public int muni_UsuCreacion { get; set; }
        public DateTime muni_FechaCreacion { get; set; }
        public int? muni_UsuModificacion { get; set; }
        public DateTime? muni_FechaModificacion { get; set; }
        public bool? muni_Estado { get; set; }

        public virtual tbDepartamentos depa { get; set; }
        public virtual tbUsuarios muni_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios muni_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbColaboradores> tbColaboradores { get; set; }
        public virtual ICollection<tbSucursales> tbSucursales { get; set; }
        public virtual ICollection<tbTransportistas> tbTransportistas { get; set; }
    }
}