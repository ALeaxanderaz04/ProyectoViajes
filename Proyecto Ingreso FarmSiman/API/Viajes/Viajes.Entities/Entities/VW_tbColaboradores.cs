﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Viajes.Entities.Entities
{
    public partial class VW_tbColaboradores
    {
        public int cola_Id { get; set; }
        public string cola_Nombres { get; set; }
        public string cola_Apellidos { get; set; }
        public string cola_NombreCompleto { get; set; }
        public string cola_Identidad { get; set; }
        public DateTime cola_FechaNacimiento { get; set; }
        public string cola_Sexo { get; set; }
        public int eciv_Id { get; set; }
        public string eciv_Descripcion { get; set; }
        public string muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public string depa_Id { get; set; }
        public string depa_Nombre { get; set; }
        public string cola_DireccionExacta { get; set; }
        public string cola_Telefono { get; set; }
        public int cola_UsuCreacion { get; set; }
        public string user_Creacion { get; set; }
        public DateTime cola_FechaCreacion { get; set; }
        public int? cola_UsuModificacion { get; set; }
        public string user_Modificacion { get; set; }
        public DateTime? cola_FechaModificacion { get; set; }
        public bool cola_Estado { get; set; }
    }
}