﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Viajes.Entities.Entities
{
    public partial class VW_tbRoles
    {
        public int role_Id { get; set; }
        public string role_Nombre { get; set; }
        public int role_UsuCreacion { get; set; }
        public string user_Creacion { get; set; }
        public DateTime role_FechaCreacion { get; set; }
        public int? role_UsuModificacion { get; set; }
        public string user_Modificacion { get; set; }
        public DateTime? role_FechaModificacion { get; set; }
        public bool role_Estado { get; set; }
    }
}