﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Viajes.Entities.Entities
{
    public partial class VW_tbColaboradoresPorSucursal
    {
        public int cosu_Id { get; set; }
        public int? cola_Id { get; set; }
        public string cola_NombreCompleto { get; set; }
        public string cola_identidad { get; set; }
        public int? sucu_Id { get; set; }
        public string sucu_Nombre { get; set; }
        public decimal cosu_DistanciaSucursal { get; set; }
        public int cosu_UsuCreacion { get; set; }
        public DateTime? cosu_FechaCreacion { get; set; }
        public int? cosu_UsuModificacion { get; set; }
        public DateTime? cosu_FechaModificacion { get; set; }
        public bool? cosu_Estado { get; set; }
    }
}