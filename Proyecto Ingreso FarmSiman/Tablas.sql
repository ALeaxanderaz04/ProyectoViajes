
CREATE DATABASE	Viajes
GO

USE Viajes
GO

CREATE SCHEMA gral;
GO
CREATE SCHEMA viaj;
GO
CREATE SCHEMA acce;



GO
CREATE TABLE acce.tbRoles(
	role_Id					INT IDENTITY,
	role_Nombre				NVARCHAR(100) UNIQUE NOT NULL,
	role_UsuCreacion		INT NOT NULL,
	role_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_role_FechaCreacion DEFAULT(GETDATE()),
	role_UsuModificacion	INT,
	role_FechaModificacion	DATETIME,
	role_Estado				BIT NOT NULL CONSTRAINT DF_role_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbRoles_role_Id PRIMARY KEY(role_Id)
);


GO
CREATE TABLE acce.tbPantallas(
	pant_Id					INT IDENTITY,
	pant_Nombre				NVARCHAR(100) NOT NULL,
	pant_Url				NVARCHAR(300) NOT NULL,
	pant_Menu				NVARCHAR(300) NOT NULL,
	pant_Icono				NVARCHAR(300) NOT NULL,
	pant_reactId			NVARCHAR(80) NOT NULL,
	pant_UsuCreacion		INT NOT NULL,
	pant_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_pant_FechaCreacion DEFAULT(GETDATE()),
	pant_UsuModificacion	INT,
	pant_FechaModificacion	DATETIME,
	pant_Estado				BIT NOT NULL CONSTRAINT DF_pant_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbPantallas_pant_Id PRIMARY KEY(pant_Id)
);


GO
CREATE TABLE acce.tbPantallasPorRoles(
	prol_Id						INT IDENTITY,
	role_Id						INT NOT NULL,
	pant_Id						INT NOT NULL,
	prol_UsuCreacion			INT NOT NULL,
	prol_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_pantrole_FechaCreacion DEFAULT(GETDATE()),
	prol_UsuModificacion		INT,
	prol_FechaModificacion		DATETIME,
	prol_Estado					BIT NOT NULL CONSTRAINT DF_pantrole_Estado DEFAULT(1)
	CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbRoles_role_Id FOREIGN KEY(role_Id) REFERENCES acce.tbRoles(role_Id),
	CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbPantallas_pant_Id FOREIGN KEY(pant_Id)	REFERENCES acce.tbPantallas(pant_Id),
	CONSTRAINT PK_acce_tbPantallasPorRoles_pantrole_Id PRIMARY KEY(prol_Id)
);


GO
CREATE TABLE acce.tbUsuarios(
	[user_Id] 				INT IDENTITY(1,1),
	user_NombreUsuario		NVARCHAR(100) NOT NULL,
	user_Contrasena			NVARCHAR(MAX) NOT NULL,
	user_EsAdmin			BIT,
	role_Id					INT,
	user_UsuCreacion		INT NOT NULL,
	user_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_user_FechaCreacion DEFAULT(GETDATE()),
	user_UsuModificacion	INT,
	user_FechaModificacion	DATETIME,
	user_Estado				BIT NOT NULL CONSTRAINT DF_user_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbUsuarios_user_Id  PRIMARY KEY(user_Id),
	CONSTRAINT UQ_acce_tbUsuarios_user_NombreUsuario UNIQUE(user_NombreUsuario)
);



GO
CREATE OR ALTER PROCEDURE acce.UDP_InsertUsuario
	@user_NombreUsuario NVARCHAR(100),	
    @user_Contrasena NVARCHAR(200),
	@user_EsAdmin BIT,					
    @role_Id INT
AS
BEGIN
	DECLARE @password NVARCHAR(MAX)=(SELECT HASHBYTES('Sha2_512', @user_Contrasena));

	INSERT acce.tbUsuarios(user_NombreUsuario, user_Contrasena, user_EsAdmin, role_Id, user_UsuCreacion)
	VALUES(@user_NombreUsuario, @password, @user_EsAdmin, @role_Id, 1);
END;


GO
EXEC acce.UDP_InsertUsuario 'Cristian', '123', 1, NULL;


GO
ALTER TABLE acce.tbRoles
ADD CONSTRAINT FK_acce_tbRoles_acce_tbUsuarios_role_UsuCreacion_user_Id 	FOREIGN KEY(role_UsuCreacion) REFERENCES acce.tbUsuarios(user_Id),
	CONSTRAINT FK_acce_tbRoles_acce_tbUsuarios_role_UsuModificacion_user_Id FOREIGN KEY(role_UsuModificacion) REFERENCES acce.tbUsuarios(user_Id);

GO
INSERT INTO acce.tbRoles(role_Nombre, role_UsuCreacion)
VALUES	('Gerente de tienda', 1);


GO
UPDATE acce.tbUsuarios
SET role_Id = 1
WHERE [user_Id] = 1;


GO
ALTER TABLE [acce].[tbUsuarios]
ADD CONSTRAINT FK_acce_tbUsuarios_acce_tbUsuarios_user_UsuCreacion_user_Id  FOREIGN KEY(user_UsuCreacion) REFERENCES acce.tbUsuarios([user_Id]),
	CONSTRAINT FK_acce_tbUsuarios_acce_tbUsuarios_user_UsuModificacion_user_Id  FOREIGN KEY(user_UsuModificacion) REFERENCES acce.tbUsuarios([user_Id]),
	CONSTRAINT FK_acce_tbUsuarios_acce_tbRoles_role_Id FOREIGN KEY(role_Id) REFERENCES acce.tbRoles(role_Id)

GO 
ALTER TABLE [acce].[tbPantallasPorRoles]
ADD CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbUsuarios_pantrole_UsuCreacion_user_Id FOREIGN KEY([prol_UsuCreacion]) REFERENCES acce.tbUsuarios([user_Id]),
	CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbUsuarios_pantrole_UsuModificacion_user_Id FOREIGN KEY([prol_UsuModificacion]) REFERENCES acce.tbUsuarios([user_Id])



--****************************************--
--****************************************--
------------------- GRAL  ------------------ 



--********TABLA DEPARTAMENTO****************---
GO
CREATE TABLE [gral].[tbDepartamentos](
    depa_Id                     CHAR(2),
	depa_Nombre 				NVARCHAR(100) NOT NULL,
	depa_UsuCreacion			INT NOT NULL,
	depa_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_depa_FechaCreacion DEFAULT(GETDATE()),
	depa_UsuModificacion		INT,
	depa_FechaModificacion		DATETIME,
	depa_Estado					BIT NOT NULL CONSTRAINT DF_depa_Estado DEFAULT(1)
	CONSTRAINT PK_gral_tbDepartamentos_depa_Id 									PRIMARY KEY(depa_Id),
	CONSTRAINT FK_gral_tbDepartamentos_acce_tbUsuarios_depa_UsuCreacion_user_Id  		FOREIGN KEY(depa_UsuCreacion) 		REFERENCES acce.tbUsuarios([user_Id]),
	CONSTRAINT FK_gral_tbDepartamentos_acce_tbUsuarios_depa_UsuModificacion_user_Id  	FOREIGN KEY(depa_UsuModificacion) 	REFERENCES acce.tbUsuarios([user_Id]),
	CONSTRAINT QU_gral_tbDepartamentos_depa_Nombre		UNIQUE(depa_Nombre)
);



--********TABLA MUNICIPIO****************---
GO
CREATE TABLE gral.tbMunicipios(
	muni_Id                 CHAR(4),
    muni_Nombre				NVARCHAR(80) NOT NULL,
	depa_Id					CHAR(2)	NOT NULL,
	muni_UsuCreacion		INT	NOT NULL,
	muni_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_muni_FechaCreacion DEFAULT(GETDATE()),
	muni_UsuModificacion	INT,
	muni_FechaModificacion	DATETIME,
	muni_Estado				BIT	NOT NULL CONSTRAINT DF_muni_Estado DEFAULT(1)
	CONSTRAINT PK_gral_tbMunicipios_muni_Id 										PRIMARY KEY(muni_Id),
	CONSTRAINT FK_gral_tbMunicipios_gral_tbDepartamentos_depa_Id 					FOREIGN KEY(depa_Id) 						REFERENCES gral.tbDepartamentos(depa_Id),
	CONSTRAINT FK_gral_tbMunicipios_acce_tbUsuarios_muni_UsuCreacion_user_Id  		FOREIGN KEY(muni_UsuCreacion) 				REFERENCES acce.tbUsuarios([user_Id]),
	CONSTRAINT FK_gral_tbMunicipios_acce_tbUsuarios_muni_UsuModificacion_user_Id  	FOREIGN KEY(muni_UsuModificacion) 			REFERENCES acce.tbUsuarios([user_Id])
);



--********* ESTADOS CIVILES ***************--
GO
CREATE TABLE gral.tbEstadosCiviles(
eciv_Id							INT IdENTITY(1,1),
eciv_Descripcion				VARCHAR(100),
eciv_UsuCreacion				INT NOT NULL,
eciv_FechaCreacion				DATETIME NOT NULL CONSTRAINT DF_gral_TbEstadosCiviles_eciv_FechaCreacion    DEFAULT(GETDATE()),
eciv_UsuModificacion			INT,
eciv_FechaModificacion			DATETIME,
eciv_Estado						BIT NOT NULL CONSTRAINT DF_gral_TbEstadosCiviles_eciv_Estado    DEFAULT(1)
CONSTRAINT     PK_gral_tbEstadosCiviles_ectv_Id PRIMARY KEY(eciv_Id),
CONSTRAINT     FK_gral_tbEstadosCiviles_UsuCreacion_usua_Id        FOREIGN KEY(eciv_UsuCreacion) REFERENCES acce.tbUsuarios([user_Id]),
CONSTRAINT     FK_gral_tbEstadosCiviles_UsuModificacion_usua_Id    FOREIGN KEY(eciv_UsuModificacion) REFERENCES acce.tbUsuarios([user_Id]),
CONSTRAINT	   QU_gral_tbestadosCiviles_eciv_Descripcion	       UNIQUE(eciv_Descripcion)
);



--****************************************--
--****************************************--
------------------- VIAJ  ------------------ 

--********TABLA SUCURSALES****************---
GO
CREATE TABLE viaj.tbSucursales(
sucu_Id							INT IDENTITY(1,1),
sucu_Nombre						NVARCHAR(200)   NOT NULL,
muni_Id							CHAR(4)			NOT NULL,
sucu_Direccion					NVARCHAR(200)   NOT NULL,
sucu_UsuCreacion				INT             NOT NULL,
sucu_FechaCreacion				DATETIME         CONSTRAINT DF_viaj_tbSucursales_sucu_FechaCreacion    DEFAULT(GETDATE()),
sucu_UsuModificacion			INT,
sucu_FechaModificacion			DATETIME,
sucu_Estado						BIT             CONSTRAINT DF_viaj_tbSucursales_sucu_Estado DEFAULT (1)
CONSTRAINT PK_viaj_tbSucursales_sucu_Id                                  PRIMARY KEY(sucu_Id),
CONSTRAINT FK_viaj_tbSucursales_gral_tbMunicipios_muni_Id                FOREIGN KEY(muni_Id)				   REFERENCES gral.tbMunicipios(muni_Id),
CONSTRAINT FK_viaj_tbSucursales_acce_tbUsuarios_sucu_UsuCreacion         FOREIGN KEY(sucu_UsuCreacion)         REFERENCES acce.tbUsuarios([user_Id]),
CONSTRAINT FK_viaj_tbSucursales_acce_tbUsuarios_sucu_UsuModificacion     FOREIGN KEY(sucu_UsuModificacion)     REFERENCES acce.tbUsuarios([user_Id])
);


--********TABLA COLABORADORES****************---
GO
CREATE TABLE viaj.tbColaboradores(
cola_Id						INT IDENTITY(1,1),
cola_Nombres				NVARCHAR(200)	NOT NULL,
cola_Apellidos				NVARCHAR(200)	NOT NULL,
cola_Identidad				NVARCHAR(15)	NOT NULL,
cola_FechaNacimiento		DATE			NOT NULL,
cola_Sexo					CHAR(1)			NOT NULL,
eciv_Id					    INT				NOT NULL,
muni_Id						CHAR(4)	    		NOT NULL,
cola_DireccionExacta		NVARCHAR(250)	NOT NULL,
cola_Telefono				NVARCHAR(20)	NOT NULL,
cola_UsuCreacion			INT				NOT NULL,
cola_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_viaj_tbColaboradores_cola_FechaCreacion DEFAULT(GETDATE()),
cola_UsuModificacion		INT,
cola_FechaModificacion		DATETIME,
cola_Estado					BIT				NOT NULL CONSTRAINT DF_viaj_tbColaboradores_cola_Estado DEFAULT(1),
	
CONSTRAINT PK_viaj_tbColaboradores_cola_Id 										PRIMARY KEY(cola_Id),
CONSTRAINT CK_viaj_tbColaboradores_cola_Sexo									CHECK(cola_sexo IN ('F', 'M')),
CONSTRAINT FK_viaj_tbColaboradores_gral_tbEstadosCiviles_eciv_Id        		FOREIGN KEY(eciv_Id)					    REFERENCES gral.tbEstadosCiviles(eciv_Id),			
CONSTRAINT FK_viaj_tbColaboradores_gral_tbMunicipios_muni_Id					FOREIGN KEY(muni_Id)						REFERENCES gral.tbMunicipios(muni_Id),
CONSTRAINT FK_viaj_tbColaboradores_acce_tbUsuarios_UserCreate					FOREIGN KEY(cola_UsuCreacion)				REFERENCES acce.tbUsuarios([user_Id]),
CONSTRAINT FK_viaj_tbColaboradores_acce_tbUsuarios_UserUpdate					FOREIGN KEY(cola_UsuModificacion)			REFERENCES acce.tbUsuarios([user_Id]),
CONSTRAINT QU_viaj_tbColaboradores_cola_Identidad								UNIQUE(cola_identidad)
);


--********TABLA COLABORADORES POR SUCURSALES****************---
GO
CREATE TABLE viaj.tbColaboradoresPorSucursal(
cosu_Id							INT IDENTITY(1,1),
sucu_Id							INT,
cola_Id							INT,
cosu_DistanciaSucursal			DECIMAL(18,2)		NOT NULL,	
cosu_UsuCreacion				INT					NOT NULL,
cosu_FechaCreacion				DATETIME			CONSTRAINT DF_viaj_tbColaboradoresPorSucursal_cosu_FechaCreacion    DEFAULT(GETDATE()),
cosu_UsuModificacion			INT,
cosu_FechaModificacion			DATETIME,
cosu_Estado						BIT					CONSTRAINT DF_viaj_tbColaboradoresPorSucursal_cosu_Estado DEFAULT (1)

CONSTRAINT FK_viaj_tbColaboradoresPorSucursal_cosu_Id									PRIMARY KEY(cosu_Id),
CONSTRAINT FK_viaj_tbColaboradoresPorSucursal_viaj_tbSucursales_sucu_Id					FOREIGN KEY(sucu_Id)					REFERENCES viaj.tbSucursales(sucu_Id),
CONSTRAINT FK_viaj_tbColaboradoresPorSucursal_viaj_tbColaboradores_cola_Id				FOREIGN KEY(cola_Id)					REFERENCES viaj.tbColaboradores(cola_Id),
CONSTRAINT FK_viaj_tbColaboradoresPorSucursal_acce_tbUsuarios_cosu_UsuCreacion			FOREIGN KEY(cosu_UsuCreacion)			REFERENCES acce.tbUsuarios([user_Id]),
CONSTRAINT FK_viaj_tbColaboradoresPorSucursal_acce_tbUsuarios_cosu_UsuModificacion		FOREIGN KEY(cosu_UsuModificacion)		REFERENCES acce.tbUsuarios([user_Id])
)

--********TABLA TRANSPORTISTA****************---
GO
CREATE TABLE viaj.tbTransportistas(
tran_Id						INT IDENTITY(1,1),
tran_Nombres				NVARCHAR(200)	NOT NULL,
tran_Apellidos				NVARCHAR(200)	NOT NULL,
tran_Identidad				NVARCHAR(15)	NOT NULL,
tran_FechaNacimiento		DATE			NOT NULL,
tran_Sexo					CHAR(1)			NOT NULL,
eciv_Id					    INT				NOT NULL,
muni_Id						CHAR(4)	    		NOT NULL,
tran_DireccionExacta		NVARCHAR(250)	NOT NULL,
tran_Telefono				NVARCHAR(20)	NOT NULL,
tran_PagoKm					DECIMAL(18,2)	NOT NULL,	
tran_UsuCreacion			INT				NOT NULL,
tran_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_viaj_tbTransportistas_tran_FechaCreacion DEFAULT(GETDATE()),
tran_UsuModificacion		INT,
tran_FechaModificacion		DATETIME,
tran_Estado					BIT				NOT NULL CONSTRAINT DF_viaj_tbTransportistas_tran_Estado DEFAULT(1),
	
CONSTRAINT PK_viaj_tbTransportistas_tran_Id 									PRIMARY KEY(tran_Id),
CONSTRAINT CK_viaj_tbTransportistas_tran_Sexo									CHECK(tran_sexo IN ('F', 'M')),
CONSTRAINT FK_viaj_tbTransportistas_gral_tbEstadosCiviles_eciv_Id        		FOREIGN KEY(eciv_Id)					    REFERENCES gral.tbEstadosCiviles(eciv_Id),			
CONSTRAINT FK_viaj_tbTransportistas_gral_tbMunicipios_muni_Id					FOREIGN KEY(muni_Id)						REFERENCES gral.tbMunicipios(muni_Id),
CONSTRAINT FK_viaj_tbTransportistas_acce_tbUsuarios_UserCreate					FOREIGN KEY(tran_UsuCreacion)				REFERENCES acce.tbUsuarios([user_Id]),
CONSTRAINT FK_viaj_tbTransportistas_acce_tbUsuarios_UserUpdate					FOREIGN KEY(tran_UsuModificacion)			REFERENCES acce.tbUsuarios([user_Id]),
CONSTRAINT QU_viaj_tbTransportistas_tran_Identidad								UNIQUE(tran_Identidad)
);


--********TABLA VIAJE****************---
GO
CREATE TABLE viaj.tbViajes(
viaj_Id						INT IDENTITY(1,1) ,
tran_Id						INT				NOT NULL,
sucu_Id						INT				NOT NULL,
viaj_FechaViaje				DATETIME		NOT NULL,
viaj_UsuCreacion			INT				NOT NULL,
viaj_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_viaj_tbViajes_viaj_FechaCreacion DEFAULT(GETDATE()),
viaj_UsuModificacion		INT,
viaj_FechaModificacion		DATETIME,
viaj_Estado					BIT				NOT NULL CONSTRAINT DF_viaj_tbViajes_viaj_Estado DEFAULT(1),

CONSTRAINT PK_viaj_tbViajes_viaj_Id 									PRIMARY KEY(viaj_Id),
CONSTRAINT FK_viaj_tbViajes_viaj_tbTransportistas_tran_Id       		FOREIGN KEY(tran_Id)						REFERENCES viaj.tbTransportistas(tran_Id),			
CONSTRAINT FK_viaj_tbViajes_viaj_tbsucursales_sucu_Id					FOREIGN KEY(sucu_Id)						REFERENCES viaj.tbSucursales(sucu_Id),
CONSTRAINT FK_viaj_tbViajes_acce_tbUsuarios_UserCreate					FOREIGN KEY(viaj_UsuCreacion)				REFERENCES acce.tbUsuarios([user_Id]),
CONSTRAINT FK_viaj_tbViajes_acce_tbUsuarios_UserUpdate					FOREIGN KEY(viaj_UsuModificacion)			REFERENCES acce.tbUsuarios([user_Id]),
)

--********TABLA VIAJE****************---
GO
CREATE TABLE viaj.tbViajesDetalles(
vide_Id						INT IDENTITY(1,1) ,
viaj_Id						INT				NOT NULL,
cola_Id						INT				NOT NULL,
vide_UsuCreacion			INT				NOT NULL,
vide_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_vide_tbViajesDetalles_vide_FechaCreacion DEFAULT(GETDATE()),
vide_UsuModificacion		INT,
vide_FechaModificacion		DATETIME,
vide_Estado					BIT				NOT NULL CONSTRAINT DF_vide_tbViajesDetalles_vide_Estado DEFAULT(1),

CONSTRAINT PK_viaj_tbViajesDetalles_vide_Id 									PRIMARY KEY(vide_Id),
CONSTRAINT FK_viaj_tbViajesDetalles_viaj_tbViajes_viaj_Id      					FOREIGN KEY(viaj_Id)					    REFERENCES viaj.tbViajes(viaj_Id),			
CONSTRAINT FK_viaj_tbViajesDetalles_viaj_tbColaboradores_cola_Id        		FOREIGN KEY(cola_Id)					    REFERENCES viaj.tbColaboradores(cola_Id),			
CONSTRAINT FK_viaj_tbViajesDetalles_acce_tbUsuarios_UserCreate					FOREIGN KEY(vide_UsuCreacion)				REFERENCES acce.tbUsuarios([user_Id]),
CONSTRAINT FK_viaj_tbViajesDetalles_acce_tbUsuarios_UserUpdate					FOREIGN KEY(vide_UsuModificacion)			REFERENCES acce.tbUsuarios([user_Id]),
)

		
GO
INSERT INTO acce.tbPantallas (pant_Nombre, pant_Url, pant_Menu, pant_Icono, pant_reactId, pant_UsuCreacion, pant_UsuModificacion, pant_FechaModificacion)
VALUES	('Usuario',			'/Usuario/usuario_index',				'Acceso',		'pi pi-fw pi-user',			'UsuarioItem',		1,NULL,NULL),
		('Roles',			'/Roles/roles_index',					'Acceso',		'pi pi-fw pi-sign-in',		'RolesItem',		1,NULL,NULL),
		('Municipios',		'/Municipios/municipios_index',			'General',		'pi pi-fw pi-map',			'MunicipioItem',	1,NULL,NULL),
		('Estado Civil',	'/EstadoCivil/estado_index',			'General',		'pi pi-fw pi pi-heart',		'EstadoCivilItem',	1,NULL,NULL),
		('Departamentos',	'/Departamentos/departamento_index',	'General',		'pi pi-fw pi-map',			'DepartamentoItem',	1,NULL,NULL);

		
GO
INSERT INTO acce.tbPantallas (pant_Nombre, pant_Url, pant_Menu, pant_Icono, pant_reactId, pant_UsuCreacion, pant_UsuModificacion, pant_FechaModificacion)
VALUES	('Colaboradores',	'/Colaboradores/Colaboradores_index',	'Viaje',		'pi pi-fw pi-users',			'ColaboradoresItem',	1,NULL,NULL),
		('Transportistas',	'/Transportistas/Transportistas_index',	'Viaje',		'pi pi-fw pi-truck',			'FacturaItem',			1,NULL,NULL),
		('Sucursales',		'/Sucursal/sucursal_index',				'Viaje',		'pi pi-fw pi-map-marker',		'SucursalItem',			1,NULL,NULL),
		('Viajes',			'/Viajes/Viajes_index',					'Viaje',		'pi pi-fw pi-directions',		'ViajesItem',			1,NULL,NULL),
		('Reporte',			'/Reporte/reporte_index',				'Viaje',		'pi pi-fw pi-file-pdf',			'ReporteItem',			1,NULL,NULL);
		


--********** DEPARTAMENTOS TABLE ***************--
GO
INSERT INTO gral.tbDepartamentos(depa_Id, depa_Nombre, depa_Estado, depa_UsuCreacion, depa_FechaCreacion, depa_UsuModificacion, depa_FechaModificacion)
VALUES	('01','Atlántida', '1', 1, GETDATE(), NULL, NULL),
		('02','Colón', '1', 1, GETDATE(), NULL, NULL),
		('03','Comayagua', '1', 1, GETDATE(), NULL,NULL),
		('04','Copán', '1', 1, GETDATE(), NULL, NULL),
		('05','Cortés', '1', 1, GETDATE(), NULL, NULL),
		('06','Choluteca', '1', 1, GETDATE(), NULL, NULL),
		('07','El Paraíso', '1', 1, GETDATE(), NULL, NULL),
		('08','Francisco Morazán', '1', 1, GETDATE(), NULL, NULL),
		('09','Gracias a Dios', '1', 1, GETDATE(), NULL, NULL),
		('10','Intibucá', '1', 1, GETDATE(), NULL, NULL),
		('11','Islas de la Bahía', '1', 1, GETDATE(), NULL, NULL),
		('12','La Paz', '1', 1, GETDATE(), NULL, NULL),
		('13','Lempira', '1', 1, GETDATE(), NULL,NULL ),
		('14','Ocotepeque', '1', 1, GETDATE(), NULL, NULL),
		('15','Olancho', '1', 1, GETDATE(), NULL, NULL),
		('16','Santa Bárbara', '1', 1, GETDATE(), NULL, NULL),
		('17','Valle', '1', 1, GETDATE(), NULL, NULL),
		('18','Yoro', '1', 1, GETDATE(), NULL, NULL);



--********** MUNICIPIOS TABLE ***************--
GO
INSERT INTO gral.tbMunicipios(depa_Id, muni_Id, muni_Nombre, muni_Estado, muni_UsuCreacion, muni_FechaCreacion, muni_UsuModificacion, muni_FechaModificacion)
VALUES	('01','0101','La Ceiba', '1', 1, GETDATE(), NULL, GETDATE()),
		('01','0102','El Porvenir', '1', 1, GETDATE(), NULL, GETDATE()),
		('01','0103','Tela', '1', 1, GETDATE(), NULL, GETDATE()),
		('01','0104','Jutiapa', '1', 1, GETDATE(), NULL, GETDATE()),
		('01','0105','La Masica', '1', 1, GETDATE(), NULL, GETDATE()),
		('01','0106','San Francisco', '1', 1, GETDATE(), NULL, GETDATE()),
		('01','0107','Arizona', '1', 1, GETDATE(), NULL, GETDATE()),
		('01','0108','Esparta', '1', 1, GETDATE(), NULL, GETDATE()),
	

		('02','0201','Trujillo', '1', 1, GETDATE(), NULL, GETDATE()),
		('02','0202','Balfate', '1', 1, GETDATE(), NULL, GETDATE()),
		('02','0203','Iriona', '1', 1, GETDATE(), NULL, GETDATE()),
		('02','0204','Limón', '1', 1, GETDATE(), NULL, GETDATE()),
		('02','0205','Sabá', '1', 1, GETDATE(), NULL, GETDATE()),
		('02','0206','Santa Fe', '1', 1, GETDATE(), NULL, GETDATE()),
		('02','0207','Santa Rosa de Aguán', '1', 1, GETDATE(), NULL, GETDATE()),
		('02','0208','Sonaguera', '1', 1, GETDATE(), NULL, GETDATE()),
		('02','0209','Tocoa', '1', 1, GETDATE(), NULL, GETDATE()),
		('02','0210','Bonito Oriental', '1', 1, GETDATE(), NULL, GETDATE()),


		('03',		'0301',		'Comayagua', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0302',		'Ajuterique', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0303',		'El Rosario', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0304',		'Esquías', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0305',		'Humuya', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0306',		'La Libertad', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0307',		'Lamaná', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0308',		'La Trinidad', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0309',		'Lejamaní', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0310',		'Meámbar', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0311',		'Minas de Oro', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0312',		'Ojos de Agua', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0313',		'San Jerónimo', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0314',		'San José de Comayagua', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0315',		'San José del Potrero', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0316',		'San Luis', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0317',		'San Sebastián', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0318',		'Siguatepeque', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0319',		'Villa de San Antonio', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0320',		'Las Lajas', '1', 1, GETDATE(), NULL, GETDATE()),
		('03',		'0321',		'Taulabé', '1', 1, GETDATE(), NULL, GETDATE()),


		('04',	'0401','Santa Rosa de Copán', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0402','Cabañas', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0403','Concepción', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0404','Copán Ruinas', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0405','Corquín', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0406','Cucuyagua', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0407','Dolores', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0408','Dulce Nombre', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0409','El Paraíso', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0410','Florida', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0411','La Jigua', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0412','La Unión', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0413','Nueva Arcadia', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0414','San Agustín', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0415','San Antonio', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0416','San Jerópnimo', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0417','San José', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0418','San Juan de Opoa', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0419','San Nicolás', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0420','San Pedro', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0421','Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0422','Trinidad de Copán', '1', 1, GETDATE(), NULL, GETDATE()),
		('04',	'0423','Veracruz', '1', 1, GETDATE(), NULL, GETDATE()),


		('05',	'0501','San Pedro Sula', '1', 1, GETDATE(), NULL, GETDATE()),
		('05',	'0502','Choloma', '1', 1, GETDATE(), NULL, GETDATE()),
		('05',	'0503','Omoa', '1', 1, GETDATE(), NULL, GETDATE()),
		('05',	'0504','Pimienta', '1', 1, GETDATE(), NULL, GETDATE()),
		('05',	'0505','Potrerillos', '1', 1, GETDATE(), NULL, GETDATE()),
		('05',	'0506','Puerto Cortés', '1', 1, GETDATE(), NULL, GETDATE()),
		('05',	'0507','San Antonio de Cortés', '1', 1, GETDATE(), NULL, GETDATE()),
		('05',	'0508','San Francisco de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
		('05',	'0509','San Manuel', '1', 1, GETDATE(), NULL, GETDATE()),
		('05',	'0510','Santa Cruz de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
		('05',	'0511','Villanueva', '1', 1, GETDATE(), NULL, GETDATE()),
		('05',	'0512','La Lima', '1', 1, GETDATE(), NULL, GETDATE()),


		('06',	'0601','Choluteca', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0602','Apacilagua', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0603','Concepción de María', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0604','Duyure', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0605','El Corpus', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0606','El Triunfo', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0607','Marcovia', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0608','Morolica', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0609','Namasigue', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0610','Orocuina', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0611','Pespire', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0612','San Antonio de Flores', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0613','San Isidro', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0614','San José', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0615','San Marcos de Colón', '1', 1, GETDATE(), NULL, GETDATE()),
		('06',	'0616','Santa Ana de Yusguare', '1', 1, GETDATE(), NULL, GETDATE()),


		('07', '0701', 'Yuscarán', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0702', 'Alauca', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0703', 'Danlí', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0704', 'El Paraíso', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0705', 'Guinope', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0706', 'Jacaleapa', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0707', 'Liure', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0708', 'Morocelí', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0709', 'Oropolí', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0710', 'Potrerillos', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0711', 'San Antonio de Flores', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0712', 'San Lucas', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0713', 'San Matías', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0714', 'Soledad', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0715', 'Teupasenti', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0716', 'Texiguat', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0717', 'Vado Ancho', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0718', 'Yauyupe', '1', 1, GETDATE(), NULL, GETDATE()),
		('07', '0719', 'Trojes', '1', 1, GETDATE(), NULL, GETDATE()),


		('08', '0801', 'Distrito Central', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0802', 'Alubarén', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0803', 'Cedros', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0804', 'Curarén', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0805', 'El Porvenir', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0806', 'Guaimaca', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0807', 'La Libertad', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0808', 'La Venta', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0809', 'Lepaterique', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0810', 'Maraita', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0811', 'Marale', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0812', 'Nueva Armenia', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0813', 'Ojojona', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0814', 'Orica', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0815', 'Reitoca', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0816', 'Sabanagrande', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0817', 'San Antonio de Oriente', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0818', 'San Buenaventura', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0819', 'San Ignacio', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0820', 'San Juan de Flores', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0821', 'San Miguelito', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0822', 'Santa Ana', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0823', 'Santa Lucía', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0824', 'Talanga', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0825', 'Tatumbla', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0826', 'Valle de ángeles', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0827', 'Villa de San Francisco', '1', 1, GETDATE(), NULL, GETDATE()),
		('08', '0828', 'Vallecillo', '1', 1, GETDATE(), NULL, GETDATE()),
		
		('09', '0901', 'Puerto Lempira', '1', 1, GETDATE(), NULL, GETDATE()),
		('09', '0902', 'Brus Laguna', '1', 1, GETDATE(), NULL, GETDATE()),
		('09', '0903', 'Ahuas', '1', 1, GETDATE(), NULL, GETDATE()),
		('09', '0904', 'Juan Francisco Bulnes', '1', 1, GETDATE(), NULL, GETDATE()),
		('09', '0905', 'Ramón Villeda Morales', '1', 1, GETDATE(), NULL, GETDATE()),
		('09', '0906', 'Wampusirpe', '1', 1, GETDATE(), NULL, GETDATE()),
		
		('10', '1001', 'La Esperanza', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1002', 'Camasca', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1003', 'Colomoncagua', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1004', 'Concepción', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1005', 'Dolores', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1006', 'Intibucá', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1007', 'Jesús de Otoro', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1008', 'Magdalena', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1009', 'Masaguara', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1010', 'San Antonio', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1011', 'San Isidro', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1012', 'San Juan', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1013', 'San Marcos de la Sierra', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1014', 'San Miguel Guancapla', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1015', 'Santa Lucía', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1016', 'Yamaranguila', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1017', 'San Francisco de Opalaca', '1', 1, GETDATE(), NULL, GETDATE()),


		('11', '1101', 'Roatán', '1', 1, GETDATE(), NULL, GETDATE()),
		('11', '1102', 'Guanaja', '1', 1, GETDATE(), NULL, GETDATE()),
		('11', '1103', 'José Santos Guardiola', '1', 1, GETDATE(), NULL, GETDATE()),
		('11', '1104', 'Utila', '1', 1, GETDATE(), NULL, GETDATE()),


		('12', '1201', 'La Paz', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1202', 'Aguanqueterique', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1203', 'Cabañas', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1204', 'Cane', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1205', 'Chinacla', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1206', 'Guajiquiro', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1207', 'Lauterique', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1208', 'Marcala', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1209', 'Mercedes de Oriente', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1210', 'Opatoro', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1211', 'San Antonio del Norte', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1212', 'San José', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1213', 'San Juan', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1214', 'San Pedro de Tutule', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1215', 'Santa Ana', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1216', 'Santa Elena', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1217', 'Santa María', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1218', 'Santiago de Puringla', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1219', 'Yarula', '1', 1, GETDATE(), NULL, GETDATE()),


		('13', '1301', 'Gracias', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1302', 'Belén', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1303', 'Candelaria', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1304', 'Cololaca', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1305', 'Erandique', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1306', 'Gualcince', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1307', 'Guarita', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1308', 'La Campa', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1309', 'La Iguala', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1310', 'Las Flores', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1311', 'La Unión', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1312', 'La Virtud', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1313', 'Lepaera', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1314', 'Mapulaca', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1315', 'Piraera', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1316', 'San Andrés', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1317', 'San Francisco', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1318', 'San Juan Guarita', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1319', 'San Manuel Colohete', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1320', 'San Rafael', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1321', 'San Sebastián', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1322', 'Santa Cruz', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1323', 'Talgua', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1324', 'Tambla', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1325', 'Tomalá', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1326', 'Valladolid', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1327', 'Virginia', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1328', 'San Marcos de Caiquín', '1', 1, GETDATE(), NULL, GETDATE()),


		('14', '1401', 'Ocotepeque', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1402', 'Belén Gualcho', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1403', 'Concepción', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1404', 'Dolores Merendón', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1405', 'Fraternidad', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1406', 'La Encarnación', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1407', 'La Labor', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1408', 'Lucerna', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1409', 'Mercedes', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1410', 'San Fernando', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1411', 'San Francisco del Valle', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1412', 'San Jorge', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1413', 'San Marcos', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1414', 'Santa Fe', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1415', 'Sensenti', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1416', 'Sinuapa', '1', 1, GETDATE(), NULL, GETDATE()),


		('15', '1501', 'Juticalpa', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1502', 'Campamento', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1503', 'Catacamas', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1504', 'Concordia', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1505', 'Dulce Nombre de Culmí', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1506', 'El Rosario', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1507', 'Esquipulas del Norte', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1508', 'Gualaco', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1509', 'Guarizama', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1510', 'Guata', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1511', 'Guayape', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1512', 'Jano', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1513', 'La Unión', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1514', 'Mangulile', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1515', 'Manto', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1516', 'Salamá', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1517', 'San Esteban', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1518', 'San Francisco de Becerra', '1',1, GETDATE(), NULL, GETDATE()),
		('15', '1519', 'San Francisco de la Paz', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1520', 'Santa María del Real', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1521', 'Silca', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1522', 'Yocón', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1523', 'Patuca', '1', 1, GETDATE(), NULL, GETDATE()),


		('16', '1601' , 'Santa Bárbara', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1602' , 'Arada', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1603' , 'Atima', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1604' , 'Azacualpa', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1605' , 'Ceguaca', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1606' , 'Concepción del Norte', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1607' , 'Concepción del Sur', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1608' , 'Chinda', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1609' , 'El Níspero', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1610' , 'Gualala', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1611' , 'Ilama', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1612' , 'Las Vegas', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1613' , 'Macuelizo', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1614' , 'Naranjito', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1615' , 'Nuevo Celilac', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1616' , 'Nueva Frontera', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1617' , 'Petoa', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1618' , 'Protección', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1619' , 'Quimistán', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1620' , 'San Francisco de Ojuera', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1621' , 'San Jose de las Colinas', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1622' , 'San Luis', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1623' , 'San Marcos', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1624' , 'San Nicolás', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1625' , 'San Pedro Zacapa', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1626' , 'San Vicente Centenario', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1627' , 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1628' , 'Trinidad', '1', 1, GETDATE(), NULL, GETDATE()),


		('17', '1701', 'Nacaome', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1702', 'Alianza', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1703', 'Amapala', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1704', 'Aramecina', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1705', 'Caridad', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1706', 'Goascorán', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1707', 'Langue', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1708', 'San Francisco de Coray', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1709', 'San Lorenzo', '1', 1, GETDATE(), NULL, GETDATE()),


		('18', '1801', 'Yoro', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1802', 'Arenal', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1803', 'El Negrito', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1804', 'El Progreso', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1805', 'Jocón', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1806', 'Morazán', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1807', 'Olanchito', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1808', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1809', 'Sulaco', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1810', 'Victoria', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1811', 'Yorito', '1', 1, GETDATE(), NULL, GETDATE());

