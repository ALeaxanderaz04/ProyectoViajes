
USE Viajes
GO


--******************************************--
--********* TABLA DEPARTAMENTOS ************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW gral.VW_tbDepartamentos
AS
SELECT	depa_Id, 
		depa_Nombre, 
		depa_UsuCreacion, 
		T2.user_NombreUsuario AS user_Creacion,
		depa_FechaCreacion, 
		depa_UsuModificacion, 
		T3.user_NombreUsuario AS user_Modificacion,
		depa_FechaModificacion, 
		depa_Estado
FROM [gral].[tbDepartamentos] AS T1 INNER JOIN [acce].[tbUsuarios] AS T2
ON T1.depa_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3 
ON T1.depa_UsuModificacion = T3.[user_Id];


--**************  INSERT ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbDepartamentos_Insert 
(@depa_Id	CHAR(2),
 @depa_Nombre NVARCHAR(100),
 @depa_UsuCreacion	INT)
AS
BEGIN
	BEGIN TRY
				INSERT INTO [gral].[tbDepartamentos] (depa_Id, depa_Nombre, depa_UsuCreacion)
				VALUES (@depa_Id, @depa_Nombre , @depa_UsuCreacion);

				SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END


--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbDepartamentos_Update
(@depa_Id CHAR(2),
 @depa_Nombre NVARCHAR(100),
 @depa_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
				UPDATE gral.tbDepartamentos
				SET   depa_Nombre = @depa_Nombre,  
					  depa_UsuModificacion = @depa_UsuModificacion, 
					  depa_FechaModificacion = GETDATE()
				WHERE depa_Id = @depa_Id		

				SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbDepartamentos_Delete
(@depa_Id CHAR(2))
AS
BEGIN
 BEGIN TRY
	UPDATE	gral.tbDepartamentos
	SET		[depa_Estado] = 0
	WHERE	depa_Id = @depa_Id

	SELECT 1 
 END TRY
 BEGIN CATCH
	SELECT 'Error ' + ERROR_MESSAGE() 
 END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbDepartamentos_Index
AS
BEGIN
	SELECT * FROM gral.VW_tbDepartamentos 
	WHERE depa_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbDepartamentos_Find 
(@depa_Id CHAR(2))
AS
BEGIN
	SELECT * FROM gral.VW_tbDepartamentos
	WHERE depa_Id = @depa_Id
END




--******************************************--
--************ TABLA MUNICIPIOS ************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW gral.VW_tbMunicipios
AS
SELECT	muni_Id, 
		muni_Nombre, 
		T1.depa_Id, 
		T2.depa_Nombre
		muni_UsuCreacion, 
		T3.user_NombreUsuario AS user_Creacion,
		muni_FechaCreacion, 
		muni_UsuModificacion, 
		t4.user_NombreUsuario AS user_Modificacion,
		muni_FechaModificacion, 
		muni_Estado
FROM gral.tbMunicipios AS T1 INNER JOIN gral.tbDepartamentos AS T2
ON T1.depa_Id = T2.depa_Id INNER JOIN acce.tbUsuarios AS T3
ON T1.muni_UsuCreacion = t3.user_Id LEFT JOIN acce.tbUsuarios AS T4
ON T1.muni_UsuModificacion = t4.user_Id



--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMunicipios_Insert
(@muni_Id CHAR(4),
 @muni_Nombre NVARCHAR(100),
 @depa_Id CHAR(2),
 @muni_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY
		INSERT INTO [gral].[tbMunicipios] (muni_Id, muni_Nombre, depa_Id, muni_UsuCreacion)
		VALUES (@muni_Id, @muni_Nombre, @depa_Id, @muni_UsuCreacion);

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END


--**************  UPDATE  ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMunicipios_Update
(@muni_Id CHAR(4),
 @muni_Nombre NVARCHAR(100),
 @depa_Id CHAR(2),
 @muni_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		UPDATE gral.tbMunicipios
		SET muni_Nombre = @muni_Nombre, 
			depa_Id = @depa_Id, 
			muni_UsuModificacion = @muni_UsuModificacion, 
			muni_FechaModificacion = GETDATE()
		WHERE muni_Id = @muni_Id
		
		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END

--**************  DELETE  ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMunicipios_Delete
(@muni_Id CHAR(4))
AS
BEGIN
	BEGIN TRY
		UPDATE gral.tbMunicipios
		SET muni_Estado = 0
		WHERE muni_Id = @muni_Id

		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END

--**************  INDEX  ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMunicipios_Index
AS
BEGIN
	SELECT * FROM gral.VW_tbMunicipios
	WHERE muni_Estado = 1;
END

--**************  FIND  ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMunicipios_Find 
(@muni_Id CHAR(4))
AS
BEGIN
	SELECT * FROM gral.VW_tbMunicipios
	WHERE muni_Id = @muni_Id;
END




--***********************************************--
--************ TABLA ESTADOS CIVILES ************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW gral.VW_tbEstadosCiviles
AS
SELECT	eciv_Id, 
		eciv_Descripcion,
		eciv_UsuCreacion, 
		T2.user_NombreUsuario AS user_Creacion,
		eciv_FechaCreacion, 
		eciv_UsuModificacion, 
		T3.user_NombreUsuario AS user_Modificacion,
		eciv_FechaModificacion, 
		eciv_Estado
FROM	[gral].[tbEstadosCiviles] AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.eciv_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3
ON T1.eciv_UsuModificacion = T3.[user_Id]



--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Insert
(@eciv_Descripcion NVARCHAR(100),
 @eciv_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY 
		INSERT INTO [gral].[tbEstadosCiviles] (eciv_Descripcion, eciv_UsuCreacion)
		VALUES (@eciv_Descripcion, @eciv_UsuCreacion);

		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END

--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Update
(@eciv_Id INT,
 @eciv_Descripcion NVARCHAR(100),
 @eciv_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		UPDATE	gral.tbEstadosCiviles
		SET		eciv_Descripcion = @eciv_Descripcion, 
				eciv_UsuModificacion = @eciv_UsuModificacion, 
				eciv_FechaModificacion = GETDATE()
		WHERE	eciv_Id = @eciv_Id

		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Delete
(@eciv_Id INT)
AS
BEGIN
	BEGIN TRY

		IF EXISTS (SELECT eciv_Id FROM viaj.tbTransportistas WHERE eciv_Id = @eciv_Id)
			BEGIN SELECT 0 END
		ELSE IF EXISTS (SELECT eciv_Id FROM viaj.tbColaboradores WHERE eciv_Id = @eciv_Id)
			BEGIN SELECT 0 END
		ELSE 
			BEGIN
				UPDATE	gral.tbEstadosCiviles
				SET		eciv_Estado = 0
				WHERE	eciv_Id = @eciv_Id

				SELECT 1 
			END
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Index
AS
BEGIN
	SELECT * FROM gral.VW_tbEstadosCiviles
	WHERE eciv_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Find 
(@eciv_Id INT)
AS
BEGIN
	SELECT * FROM gral.VW_tbEstadosCiviles
	WHERE eciv_Id = @eciv_Id;
END




--***************** ACCE ***********************--
--***********************************************--



-- ************* TABLA USUARIOS *****************--


--************  INSERT **************---
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbusuarios_INSERT
(@user_NombreUsuario NVARCHAR(100),
 @user_Contrasena NVARCHAR(MAX),
 @user_EsAdmin BIT,
 @role_Id INT,
 @user_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY
			INSERT INTO [acce].[tbUsuarios] (user_NombreUsuario, user_Contrasena, user_EsAdmin, role_Id, user_UsuCreacion)
			VALUES (@user_NombreUsuario, HASHBYTES('SHA2_512',@user_Contrasena), @user_EsAdmin, @role_Id, @user_UsuCreacion)

			SELECT 1 AS codeStatus
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  codeStatus
	END CATCH
END

--*********** UPDATE  ****************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbusuarios_UPDATE
(@user_Id INT,
 @user_EsAdmin BIT,
 @role_Id INT,
 @user_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		UPDATE [acce].[tbUsuarios]
		SET [user_EsAdmin] = @user_EsAdmin,
			[role_Id] = @role_Id,
			[user_UsuModificacion] = @user_UsuModificacion,
			[user_FechaModificacion] = GETDATE()
		WHERE [user_Id] = @user_Id;
		SELECT 1 

	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END


--********** DELETE ***********--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbusuarios_DELETE
(@user_Id INT)
AS
BEGIN
	BEGIN TRY
		UPDATE	[acce].[tbUsuarios]
		SET		[user_Estado]  = 0,
				[user_FechaModificacion] = GETDATE()
		WHERE	[user_Id] = @user_Id

		SELECT 1 

	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END


--*********** VIEW ********************---
GO
CREATE OR ALTER VIEW acce.VW_tbUsuarios
AS
SELECT T1.[user_Id]
      ,T1.[user_NombreUsuario]
      ,T1.[user_Contrasena]
      ,T1.[user_EsAdmin]
      ,T1.[role_Id]
	  ,T4.role_Nombre
      ,T1.[user_UsuCreacion]
      ,T2.[user_NombreUsuario] AS user_Creacion
      ,T1.[user_FechaCreacion]
      ,T1.[user_UsuModificacion]
	  ,T3.[user_NombreUsuario] AS user_Modificacion
      ,T1.[user_FechaModificacion]
      ,T1.[user_Estado]
  FROM [acce].[tbUsuarios] T1 LEFT JOIN acce.tbRoles T4
  ON T1.role_Id = T4.role_Id INNER JOIN  acce.tbUsuarios T2
  ON T1.user_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.user_UsuModificacion = T3.[user_Id]


--************* INDEX ***********--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_Index
AS
BEGIN
	SELECT * FROM acce.VW_tbUsuarios
	WHERE user_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_Find
(@user_Id INT)
AS
BEGIN
	SELECT * FROM acce.VW_tbUsuarios
	WHERE [user_Id] = @user_Id;
END


-- ************* LOGIN *****************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_IniciarSesion 
(@user_NombreUsuario	NVARCHAR(100),
 @user_Contrasena	NVARCHAR(MAX))
AS
BEGIN
	DECLARE @password NVARCHAR(MAX)=(SELECT HASHBYTES('Sha2_512', @user_Contrasena));
	SELECT *
	FROM acce.VW_tbUsuarios
	WHERE user_NombreUsuario = @user_NombreUsuario AND user_Contrasena = @password
END



--***********************************************--
-- ************* TABLA ROLES *****************--
GO
CREATE OR ALTER VIEW acce.VW_tbRoles
AS
SELECT T1.[role_Id]
      ,[role_Nombre]
      ,[role_UsuCreacion]
	  ,t2.user_NombreUsuario AS user_Creacion
      ,[role_FechaCreacion]
      ,[role_UsuModificacion]
	  ,t3.user_NombreUsuario AS user_Modificacion
      ,[role_FechaModificacion]
      ,[role_Estado]
  FROM [acce].[tbRoles] T1 INNER JOIN acce.tbUsuarios T2
  ON T1.role_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.role_UsuModificacion = T3.[user_Id]

--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbRoles_Index
AS 
BEGIN
	SELECT * FROM acce.VW_tbRoles
	WHERE role_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbRoles_Find
(@role_Id	INT)
AS 
BEGIN
	SELECT * FROM acce.VW_tbRoles
	WHERE role_Id = @role_Id
END


--************** INSERT *****************--
GO

CREATE OR ALTER PROCEDURE acce.UDP_tbRoles_Insert
 (@role_Nombre NVARCHAR(100),
  @role_UsuCreacion INT)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT * FROM acce.tbRoles WHERE role_Nombre = @role_Nombre AND role_Estado = 1)
        BEGIN

            SELECT -1 codeStatus

        END
        ELSE IF NOT EXISTS (SELECT * FROM acce.tbRoles WHERE role_Nombre = @role_Nombre)
        BEGIN
		INSERT INTO [acce].[tbRoles]
				   ([role_Nombre]
				   ,[role_UsuCreacion]
				   ,[role_FechaCreacion]
				   ,[role_UsuModificacion]
				   ,[role_FechaModificacion]
				   ,[role_Estado])
			 VALUES
				   (@role_Nombre
				   ,@role_UsuCreacion
				   ,GETDATE()
				   ,Null
				   ,Null
				   ,1)

            SELECT SCOPE_IDENTITY() codeStatus
			END
        ELSE
        BEGIN
            UPDATE acce.tbRoles
            SET  role_Estado = 1
				,role_Nombre = @role_Nombre
				,role_UsuCreacion = @role_UsuCreacion
				,role_FechaCreacion = GETDATE()
				,role_UsuModificacion = NULL
				,role_FechaModificacion = NULL
            WHERE role_Nombre = @role_Nombre

            select role_Id codeStatus From acce.tbRoles  WHERE role_Nombre = @role_Nombre 
        END

    END TRY
    BEGIN CATCH
        SELECT 0 codeStatus
    END CATCH
END
GO


--************** UPDATE *****************--
GO

CREATE OR ALTER PROCEDURE acce.UDP_tbRoles_Update
  (@role_Id				INT,
  @role_Nombre			NVARCHAR(100),
  @role_UsuModificacion INT)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT * FROM acce.tbRoles WHERE (role_Nombre = @role_Nombre AND role_Id != @role_Id))
			BEGIN
				SELECT 2 codeStatus
			END
        ELSE
			BEGIN

				UPDATE acce.tbRoles
					SET  role_Estado = 1
						,role_Nombre = @role_Nombre
						,role_UsuModificacion = @role_UsuModificacion
						,role_FechaModificacion = GETDATE()
					WHERE role_Id = @role_Id


				SELECT 1 codeStatus
			END
    END TRY
    BEGIN CATCH
        SELECT 0 codeStatus
    END CATCH
END


--************** DELETE *****************--
GO

CREATE OR ALTER PROCEDURE acce.UDP_tbRoles_Delete 
  @role_Id INT
AS
BEGIN
	BEGIN TRY
		  IF EXISTS (SELECT * FROM acce.tbUsuarios WHERE (role_Id = @role_Id))
			BEGIN
				SELECT 3 codeStatus
			END
		ELSE
			BEGIN 
				UPDATE acce.tbRoles
				SET role_Estado = 0
				WHERE role_Id = @role_Id
		
				DELETE FROM [acce].[tbPantallasPorRoles]
				WHERE role_Id = @role_Id

				SELECT 1 codeStatus
			END
	
	END TRY
	BEGIN CATCH
		SELECT 0 codeStaus
	END CATCH
END



-- ************* TABLA PANTALLAS *****************--

--************** VIEW *****************--
GO
CREATE OR ALTER VIEW acce.VW_tbPantallas
AS
SELECT * 
FROM acce.tbPantallas


--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE acce.tbPantallas_Index
AS
BEGIN
	SELECT * FROM acce.VW_tbPantallas
	WHERE pant_Estado = 1;
END



-- ************* TABLA ROLES/PANTALLA *****************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbPantallasPorRoles_Insert 
	@role_Id int,
	@pant_Id int,
	@prol_UsuCreacion int
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT * FROM acce.tbPantallasPorRoles WHERE role_Id = @role_Id AND pant_Id = @pant_Id AND prol_Estado = 1)
        BEGIN

            SELECT 2 as codeStatus

        END
        ELSE IF NOT EXISTS (SELECT * FROM acce.tbPantallasPorRoles WHERE role_Id = @role_Id AND pant_Id = @pant_Id)
        BEGIN
		INSERT INTO [acce].[tbPantallasPorRoles]
           ([role_Id]
           ,[pant_Id]
           ,[prol_UsuCreacion]
           ,[prol_FechaCreacion]
           ,[prol_UsuModificacion]
           ,[prol_FechaModificacion]
           ,[prol_Estado])
     VALUES
           (@role_Id
           ,@pant_Id
           ,@prol_UsuCreacion
           ,GETDATE()
           ,NULL
           ,NULL
           ,1)

            SELECT 1 codeStatus
        END
        ELSE
        BEGIN
            UPDATE acce.tbPantallasPorRoles
            SET  prol_Estado = 1
				,prol_UsuCreacion = @prol_UsuCreacion
				,prol_FechaCreacion = GETDATE()
				,prol_UsuModificacion = NULL
				,prol_FechaModificacion = NULL
            WHERE role_Id = @role_Id AND pant_Id = @pant_Id

            select 1 codeStatus
        END

    END TRY
    BEGIN CATCH
        SELECT 'Error ' + ERROR_MESSAGE()  codeStatus
    END CATCH
END
GO


GO
CREATE OR ALTER VIEW acce.VW_tbPantallasPorRoles
AS
SELECT		prol_Id, 
			role_Id, 
			T1.pant_Id, 
			T2.pant_Nombre,
			prol_UsuCreacion, 
			prol_FechaCreacion, 
			prol_UsuModificacion, 
			prol_FechaModificacion, 
			prol_Estado
FROM		[acce].[tbPantallasPorRoles] AS T1 INNER JOIN acce.tbPantallas AS T2
ON T1.pant_Id = T2.pant_Id



--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbPantallasPorRoles_Find 
(@role_Id INT) 
AS
BEGIN
	SELECT * FROM acce.VW_tbPantallasPorRoles
	WHERE role_Id = @role_Id
END

--************** FIND PANTALLAS DISPONIBLES *****************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbPantallasPorRoles_PantallasDisponibles
(@role_Id INT) 
AS
BEGIN

	SELECT * FROM acce.tbPantallas
	WHERE pant_Id NOT IN (	SELECT pant_Id 
							FROM acce.VW_tbPantallasPorRoles
							WHERE role_Id = @role_Id)
END


--************** ELIMINAR PANTALLAS POR ROL *****************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbPantallasPorRoles_Delete
(@role_Id INT)
AS
BEGIN
	BEGIN TRY
		DELETE FROM acce.tbPantallasPorRoles
		WHERE role_Id = @role_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 1 codeStatus
	END CATCH
END


--************** FIND PANTALLAS DIBUJADO DE MENU *****************--
GO
CREATE OR ALTER PROCEDURE acce.tbPantallas_Menu 
(@role_Id INT,
 @esAdmin BIT)
AS
BEGIN
	
	IF @esAdmin = 1
		BEGIN
			SELECT * 
			FROM acce.tbPantallas 
		END
	ELSE
		BEGIN
			SELECT * 
			FROM acce.tbPantallas 
			WHERE pant_Id IN (SELECT pant_Id FROM tbPantallasPorRoles
								WHERE role_Id = @role_Id)
		END
END


--**************  ACCESO  ******************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_AccesoAPantallas
@esAdmin	INT,
@role_Id	INT,
@pant_Id	Int
AS
BEGIN

	IF @esAdmin = 1 
		BEGIN
			SELECT 1 
		END
	ELSE IF EXISTS (select * FROM acce.tbPantallasPorRoles WHERE role_Id = @role_Id
												AND pant_Id = @pant_Id)
		BEGIN
			SELECT 1 
		END
	ELSE
		BEGIN
			SELECT 0
		END
END
GO

--***************** VIAJ ***********************--
--***********************************************--
-- ************* TABLA COLABORADORES *****************--


--************** VIEW *****************--
GO
CREATE OR ALTER VIEW viaj.VW_tbColaboradores
AS
SELECT T1.[cola_Id]
      ,[cola_Nombres]
      ,[cola_Apellidos]
	  ,[cola_Nombres] + ' ' +  [cola_Apellidos] AS cola_NombreCompleto
      ,[cola_Identidad]
      ,[cola_FechaNacimiento]
      ,[cola_Sexo]
      ,T1.[eciv_Id]
	  ,T4.eciv_Descripcion
      ,T1.[muni_Id]
	  ,T5.muni_Nombre
	  ,T6.depa_Id
	  ,T6.depa_Nombre
      ,[cola_DireccionExacta]
      ,[cola_Telefono]
      ,[cola_UsuCreacion]
	  ,t2.user_NombreUsuario AS user_Creacion
      ,[cola_FechaCreacion]
      ,[cola_UsuModificacion]
	  ,t3.user_NombreUsuario AS user_Modificacion
      ,[cola_FechaModificacion]
      ,[cola_Estado]
  FROM viaj.tbColaboradores T1 INNER JOIN gral.tbEstadosCiviles T4
  ON T4.eciv_Id = T1.eciv_Id INNER JOIN gral.tbMunicipios T5
  ON T5.muni_Id = T1.muni_Id INNER JOIN gral.tbDepartamentos T6
  ON T5.depa_Id = T6.depa_Id INNER JOIN acce.tbUsuarios T2
  ON T1.cola_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.cola_UsuModificacion = T3.[user_Id]



--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradores_Index
AS 
BEGIN
	SELECT * FROM viaj.VW_tbColaboradores
	WHERE cola_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradores_Find
(@cola_Id INT)
AS 
BEGIN
	SELECT * FROM viaj.VW_tbColaboradores
	WHERE cola_Id = @cola_Id
END


--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradores_Insert 
(@cola_Nombres NVARCHAR(200),
 @cola_Apellidos NVARCHAR(200),
 @cola_Identidad NVARCHAR(15),
 @cola_FechaNacimiento DATE,
 @cola_Sexo char(1),
 @eciv_Id INT,
 @muni_Id CHAR(4),
 @cola_DireccionExacta NVARCHAR(250),
 @cola_Telefono NVARCHAR(20),
 @cola_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY
        
		INSERT INTO viaj.tbColaboradores (cola_Nombres, cola_Apellidos, cola_Identidad, cola_FechaNacimiento, cola_Sexo, eciv_Id, muni_Id, cola_DireccionExacta, cola_Telefono, cola_UsuCreacion)
		VALUES (@cola_Nombres, @cola_Apellidos, @cola_Identidad, @cola_FechaNacimiento, @cola_Sexo, @eciv_Id, @muni_Id, @cola_DireccionExacta, @cola_Telefono, @cola_UsuCreacion)

		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END

--************** UPDATE *****************--
Go
CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradores_Update
(@cola_Id INT,
 @cola_Nombres NVARCHAR(200),
 @cola_Apellidos NVARCHAR(200),
 @cola_Identidad NVARCHAR(15),
 @cola_FechaNacimiento DATE,
 @cola_Sexo char(1),
 @eciv_Id INT,
 @muni_Id CHAR(4),
 @cola_DireccionExacta NVARCHAR(250),
 @cola_Telefono NVARCHAR(20),
 @cola_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
      
		UPDATE [viaj].[tbColaboradores]
		SET cola_Nombres = @cola_Nombres, 
			cola_Apellidos = @cola_Apellidos,		
			cola_Identidad = @cola_Identidad, 
			cola_FechaNacimiento = @cola_FechaNacimiento, 
			cola_Sexo = @cola_Sexo, 
			eciv_Id = @eciv_Id, 
			muni_Id = @muni_Id, 
			cola_DireccionExacta = @cola_DireccionExacta, 
			cola_Telefono = @cola_Telefono, 
			cola_UsuModificacion = @cola_UsuModificacion, 
			cola_FechaModificacion = GETDATE()
		WHERE cola_Id = @cola_Id

		SELECT 1 

	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END


--************** DELETE *****************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradores_Delete
(@cola_Id INT)
AS
BEGIN
	BEGIN TRY
		
		IF EXISTS (SELECT cola_Id FROM viaj.tbColaboradoresPorSucursal WHERE cola_Id = @cola_Id)
			BEGIN SELECT 0 END
		ELSE IF EXISTS (SELECT cola_Id FROM viaj.tbViajesDetalles WHERE cola_Id = @cola_Id)
			BEGIN SELECT 0 END
		ELSE
			BEGIN
				UPDATE [viaj].[tbColaboradores]
				SET cola_Estado = 0
				WHERE cola_Id = @cola_Id
		
				SELECT 1 
			END
	
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END


--****************************************************--
-- ************* TABLA TRANSPORTISTAS *****************--



--************** VIEW *****************--
GO
CREATE OR ALTER VIEW viaj.VW_tbTransportistas
AS
SELECT T1.[tran_Id]
      ,[tran_Nombres]
      ,[tran_Apellidos]
	  ,[tran_Nombres] + ' ' +  [tran_Apellidos] AS tran_NombreCompleto
      ,[tran_Identidad]
      ,[tran_FechaNacimiento]
      ,[tran_Sexo]
      ,T1.[eciv_Id]
	  ,T4.eciv_Descripcion
      ,T1.[muni_Id]
	  ,T5.muni_Nombre
	  ,T6.depa_Id
	  ,T6.depa_Nombre
      ,[tran_DireccionExacta]
      ,[tran_Telefono]
	  ,[tran_PagoKm]
      ,[tran_UsuCreacion]
	  ,t2.user_NombreUsuario AS user_Creacion
      ,[tran_FechaCreacion]
      ,[tran_UsuModificacion]
	  ,t3.user_NombreUsuario AS user_Modificacion
      ,[tran_FechaModificacion]
      ,[tran_Estado]
  FROM viaj.tbTransportistas T1 INNER JOIN gral.tbEstadosCiviles T4
  ON T4.eciv_Id = T1.eciv_Id INNER JOIN gral.tbMunicipios T5
  ON T5.muni_Id = T1.muni_Id INNER JOIN gral.tbDepartamentos T6
  ON T5.depa_Id = T6.depa_Id INNER JOIN  acce.tbUsuarios T2
  ON T1.tran_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.tran_UsuModificacion = T3.[user_Id]



--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbTransportistas_Index
AS 
BEGIN
	SELECT * FROM viaj.VW_tbTransportistas
	WHERE tran_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbTransportistas_Find
(@tran_Id INT)
AS 
BEGIN
	SELECT * FROM viaj.VW_tbTransportistas
	WHERE tran_Id = @tran_Id
END



--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbTransportistas_Insert 
(@tran_Nombres NVARCHAR(200),
 @tran_Apellidos NVARCHAR(200),
 @tran_Identidad NVARCHAR(15),
 @tran_FechaNacimiento DATE,
 @tran_Sexo char(1),
 @eciv_Id INT,
 @muni_Id CHAR(4),
 @tran_DireccionExacta NVARCHAR(250),
 @tran_Telefono NVARCHAR(20),
 @tran_PagoKm DECIMAL(18,2),
 @tran_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY
        
		INSERT INTO viaj.tbTransportistas(tran_Nombres, tran_Apellidos, tran_Identidad, tran_FechaNacimiento, tran_Sexo, eciv_Id, muni_Id, tran_DireccionExacta, tran_Telefono, tran_PagoKm, tran_UsuCreacion)
		VALUES (@tran_Nombres, @tran_Apellidos, @tran_Identidad, @tran_FechaNacimiento, @tran_Sexo, @eciv_Id, @muni_Id, @tran_DireccionExacta, @tran_Telefono, @tran_PagoKm, @tran_UsuCreacion)

		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END



--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbTransportistas_Update
(@tran_Id INT,
 @tran_Nombres NVARCHAR(200),
 @tran_Apellidos NVARCHAR(200),
 @tran_Identidad NVARCHAR(15),
 @tran_FechaNacimiento DATE,
 @tran_Sexo char(1),
 @eciv_Id INT,
 @muni_Id CHAR(4),
 @tran_DireccionExacta NVARCHAR(250),
 @tran_Telefono NVARCHAR(20),
 @tran_PagoKm DECIMAL(18,2),
 @tran_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		
		UPDATE viaj.tbTransportistas
		SET tran_Nombres = @tran_Nombres, 
			tran_Apellidos = @tran_Apellidos, 
			tran_Identidad = @tran_Identidad, 
			tran_FechaNacimiento = @tran_FechaNacimiento, 
			tran_Sexo = @tran_Sexo, 
			eciv_Id= @eciv_Id, 
			muni_Id = @muni_Id, 
			tran_DireccionExacta = @tran_DireccionExacta, 
			tran_Telefono = @tran_Telefono, 
			tran_PagoKm = @tran_PagoKm, 
			tran_UsuModificacion = @tran_UsuModificacion, 
			tran_FechaModificacion = GETDATE()
		WHERE tran_Id = @tran_Id

		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END



--************** DELETE *****************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbTransportistas_Delete
(@tran_Id INT)
AS
BEGIN
	BEGIN TRY
		
		IF EXISTS (SELECT * FROM viaj.tbViajes WHERE tran_Id = @tran_Id)
			BEGIN SELECT 0 END
		ELSE 
		BEGIN
			UPDATE viaj.tbTransportistas
			SET tran_Estado = 0
			WHERE tran_Id = @tran_Id 

			SELECT 1 
		END

		
	END TRY
	BEGIN CATCH 
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END




--******************************************--
--*********** TABLA SUCURSALES **************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW viaj.VW_tbSucursales
AS
SELECT	sucu_Id, 
		sucu_Nombre, 
		T1.muni_Id, 
		T4.muni_Nombre,
		T4.depa_Id,
		T5.depa_Nombre,
		sucu_Direccion, 
		sucu_UsuCreacion, 
		T2.user_NombreUsuario AS user_Creacion,
		sucu_FechaCreacion, 
		sucu_UsuModificacion,
		T3.user_NombreUsuario AS user_Modificacion,
		sucu_FechaModificacion, 
		sucu_Estado

FROM [viaj].[tbSucursales] AS T1 INNER JOIN gral.tbMunicipios AS T4
ON T1.muni_Id = T4.muni_Id INNER JOIN gral.tbDepartamentos AS T5
ON T4.depa_Id = T5.depa_Id INNER JOIN [acce].[tbUsuarios] AS T2
ON T1.sucu_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3 
ON T1.sucu_UsuModificacion = T3.[user_Id];

--**************  INSERT ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbSucursales_Insert
(@sucu_Nombre		NVARCHAR(200), 
 @muni_Id			CHAR(4), 
 @sucu_Direccion	NVARCHAR(200), 
 @sucu_UsuCreacion	INT)
AS
BEGIN
	BEGIN TRY

		INSERT INTO [viaj].[tbSucursales](sucu_Nombre, muni_Id, sucu_Direccion, sucu_UsuCreacion)
		VALUES	(@sucu_Nombre, @muni_Id, @sucu_Direccion, @sucu_UsuCreacion)

		SELECT SCOPE_IDENTITY()

	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END


--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbSucursales_Update
(@sucu_Id				INT,
 @sucu_Nombre			NVARCHAR(200), 
 @muni_Id				CHAR(4), 
 @sucu_Direccion		NVARCHAR(200), 
 @sucu_UsuModificacion	INT)
AS
BEGIN
	BEGIN TRY
		UPDATE	viaj.tbSucursales
		SET		sucu_Nombre = @sucu_Nombre, 
				muni_Id = @muni_Id, 
				sucu_Direccion = @sucu_Direccion, 
				sucu_UsuModificacion = @sucu_UsuModificacion, 
				sucu_FechaModificacion = GETDATE()
		WHERE	sucu_Id = @sucu_Id		

		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbSucursales_Delete
(@sucu_Id INT)
AS
BEGIN
 BEGIN TRY
	
	IF EXISTS (SELECT sucu_Id FROM viaj.VW_tbViajes WHERE sucu_Id = @sucu_Id)
		BEGIN SELECT 0 END
	ELSE 
	BEGIN
		DELETE  FROM viaj.tbColaboradoresPorSucursal
		WHERE sucu_Id = @sucu_Id

		DELETE  FROM viaj.tbSucursales
		WHERE sucu_Id = @sucu_Id
		SELECT 1 
	END

	
 END TRY
 BEGIN CATCH
	SELECT 'Error ' + ERROR_MESSAGE()  
 END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbSucursales_Index
AS
BEGIN
	SELECT * FROM viaj.VW_tbSucursales
	WHERE sucu_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbSucursales_Find 
(@sucu_Id INT)
AS
BEGIN
	SELECT * FROM viaj.VW_tbSucursales
	WHERE sucu_Id = @sucu_Id
END



--******************************************--
--*********** TABLA COLABOIRADORES POR SUCURSALES **************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW viaj.VW_tbColaboradoresPorSucursal
AS
SELECT	cosu_Id,
		T1.cola_Id,
		T3.[cola_Nombres] + ' ' +  T3.[cola_Apellidos] AS cola_NombreCompleto,
		T3.cola_identidad,
		T1.sucu_Id,
		T2.sucu_Nombre,
		T1.cosu_DistanciaSucursal,
		T1.cosu_UsuCreacion,		
		T1.cosu_FechaCreacion,		
		T1.cosu_UsuModificacion,
		T1.cosu_FechaModificacion,
		T1.cosu_Estado		

FROM viaj.tbColaboradoresPorSucursal	AS T1 
INNER JOIN viaj.tbSucursales			AS T2 ON T1.sucu_Id  = T2.sucu_Id
INNER JOIN viaj.tbColaboradores			AS T3 ON t1.cola_Id = T3.cola_Id


--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradoresPorSucursales_Index
(@sucu_Id INT)
AS
BEGIN
	SELECT * FROM viaj.VW_tbColaboradoresPorSucursal
	WHERE cosu_Estado = 1 AND  sucu_Id = @sucu_Id
END


--**************  INSERT ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradoresPorSucursales_Insert 
(@sucu_Id INT,
 @cola_Id INT,
 @cosu_DistanciaSucursal DECIMAL(18,2),
 @cosu_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY
		INSERT INTO [viaj].[tbColaboradoresPorSucursal] (sucu_Id, cola_Id,cosu_DistanciaSucursal, cosu_UsuCreacion)
		VALUES (@sucu_Id, @cola_Id, @cosu_DistanciaSucursal,@cosu_UsuCreacion)
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE() 
	END CATCH
END

--**************  INSERT ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradoresPorSucursales_Delete 
(@cosu_Id INT)
AS
BEGIN
	BEGIN TRY
		DELETE FROM [viaj].[tbColaboradoresPorSucursal]
		WHERE cosu_Id = @cosu_Id

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE() 
	END CATCH
END


--******************************************--
--*********** TABLA VIAJES **************--

--**************  VIEW ******************--
GO
CREATE OR ALTER VIEW viaj.VW_tbViajes
AS
SELECT	viaj_Id, 
		T1.tran_Id, 
		T2.tran_Nombres + ' ' +  T2.tran_Apellidos AS tran_NombreCompleto,
		T1.sucu_Id,
		T5.sucu_Nombre,
		T1.viaj_FechaViaje,
		viaj_UsuCreacion, 
		T3.user_NombreUsuario AS user_Creacion,
		viaj_FechaCreacion, 
		viaj_UsuModificacion, 
		T4.user_NombreUsuario AS user_Modificacion,
		viaj_FechaModificacion, 
		viaj_Estado
FROM viaj.tbViajes AS T1	INNER JOIN viaj.tbTransportistas AS T2
ON T1.tran_Id = T2.tran_Id	INNER JOIN acce.tbUsuarios AS T3
ON T1.viaj_UsuCreacion = T3.[user_Id] LEFT JOIN acce.tbUsuarios AS T4
ON T1.viaj_UsuModificacion = T4.[user_Id] INNER JOIN viaj.tbSucursales AS T5
ON T5.sucu_Id	= T1.sucu_Id	

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbViajes_Index
AS
BEGIN
	SELECT * FROM viaj.VW_tbViajes
	WHERE viaj_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbViajes_Find
(@viaj_Id INT)
AS
BEGIN
	SELECT * FROM  viaj.VW_tbViajes
	WHERE viaj_Id = viaj_Id;
END


--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbViajes_Insert
(@tran_Id INT,
 @sucu_Id INT,
 @viaj_FechaViaje DATETIME,
 @viaj_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY
		INSERT INTO viaj.tbViajes (tran_Id,sucu_Id, viaj_FechaViaje,viaj_UsuCreacion)
		VALUES (@tran_Id, @sucu_Id, CAST(@viaj_FechaViaje AS DATE), @viaj_UsuCreacion)

		SELECT SCOPE_IDENTITY() 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
	
END	

--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbViajes_Update
(@viaj_Id INT,
 @tran_Id INT,
 @sucu_Id INT,
 @viaj_FechaViaje DATETIME,
 @viaj_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		UPDATE viaj.tbViajes
		SET tran_Id = @tran_Id, 
			sucu_Id = @sucu_Id,
			viaj_FechaViaje = CAST(@viaj_FechaViaje AS DATE),
			viaj_UsuModificacion = @viaj_UsuModificacion, 
			viaj_FechaModificacion = GETDATE() 
		WHERE viaj_Id = @viaj_Id

		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
	
END	


--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbViajes_Delete
(@viaj_Id INT)
AS
BEGIN
	BEGIN TRY
		
		DELETE  viaj.tbViajesDetalles
		WHERE	viaj_Id = @viaj_Id

		DELETE  viaj.tbViajes
		WHERE	viaj_Id = @viaj_Id
		
		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
	
END	


--***********************************************--
--*********** TABLA VIAJES DETALLES**************--



--**************  VIEW ******************--
GO
CREATE OR ALTER VIEW viaj.VW_tbViajesDetalles 
AS
SELECT	vide_Id,
		T1.viaj_Id, 
		T1.cola_Id,
		T3.cola_Nombres + ' ' +  T3.cola_Apellidos AS cola_NombreCompleto,
		T3.cola_Identidad,
		vide_UsuCreacion, 
		T4.user_NombreUsuario AS user_Creacion,
		vide_FechaCreacion, 
		vide_UsuModificacion, 
		T5.user_NombreUsuario AS user_Modificacion,
		vide_FechaModificacion, 
		vide_Estado
FROM viaj.tbViajesDetalles AS T1 INNER JOIN viaj.tbViajes AS		T2
ON T1.viaj_Id = T2.viaj_Id	INNER JOIN  viaj.tbColaboradores AS		T3
ON t1.cola_Id = T3.cola_Id  INNER JOIN acce.tbUsuarios AS			T4
ON T1.vide_UsuCreacion = T4.[user_Id] LEFT JOIN acce.tbUsuarios AS	T5
ON T1.vide_UsuModificacion = T5.[user_Id] 



--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbViajesDetalles_Index 
(@viaj_Id INT)
AS
BEGIN
	SELECT * FROM viaj.VW_tbViajesDetalles
	WHERE viaj_Id = @viaj_Id;
END


--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbViajesDetalles_Insert
(@viaj_Id INT,
 @cola_Id INT,
 @vide_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY
		INSERT INTO [viaj].[tbViajesDetalles] (viaj_Id, cola_Id, vide_UsuCreacion)
		VALUES (@viaj_Id, @cola_Id, @vide_UsuCreacion)

		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END



--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbViajesDetalles_Delete 
(@vide_Id INT)
AS
BEGIN
	BEGIN TRY
		DELETE  FROM viaj.tbViajesDetalles 
		WHERE vide_Id = @vide_Id

		SELECT 1 
	END TRY
	BEGIN CATCH
		SELECT 'Error ' + ERROR_MESSAGE()  
	END CATCH
END


----/***********************************************\-----
--- ********** PROCIDIMIENTOS ADICIONALES **********---

--**************  MUNICIPIOS POR DEPARTAMENTO ******************--
GO
CREATE OR ALTER PROCEDURE gral.tbMunicipios_DDL 
(@depa_Id CHAR(2))
AS
BEGIN
	SELECT * FROM gral.VW_tbMunicipios
	WHERE depa_Id = @depa_Id
END


--**************  COLABORADORES DISPONIBLES ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradores_Available
(@sucu_Id INT)
AS
BEGIN
	
	SELECT * FROM viaj.VW_tbColaboradores
	WHERE cola_Id NOT IN (SELECT cola_Id FROM [viaj].[tbColaboradoresPorSucursal]
						WHERE sucu_Id = @sucu_Id)
END


--**************  COLABORADORES DISPONIBLES PARA VIAJAR ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradores_AvailableTravel 
(@viaj_Id INT)
AS
BEGIN
	
	DECLARE @FechaViaje DATETIME = (SELECT viaj_FechaViaje FROM viaj.tbViajes WHERE viaj_Id = @viaj_Id)
	DECLARE @Sucursal INT = (SELECT sucu_Id FROM viaj.tbViajes WHERE viaj_Id = @viaj_Id)

	SELECT * 
	FROM viaj.VW_tbColaboradores 
	WHERE cola_Id NOT IN (
							SELECT cola_Id 
							FROM viaj.tbViajesDetalles AS T1 
							INNER JOIN viaj.tbViajes AS T2 ON T1.viaj_Id = T2.viaj_Id 
							WHERE  T1.viaj_Id = @viaj_Id OR T2.viaj_FechaViaje = @FechaViaje
	) AND cola_Id IN (	SELECT cola_Id
						FROM viaj.tbColaboradoresPorSucursal
						WHERE sucu_Id = @Sucursal)
END

--**************  KILOMETRAJE ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_Kilometraje
(@sucu_Id INT,
 @cola_Id INT)
AS
BEGIN
		SELECT cosu_DistanciaSucursal
		FROM viaj.VW_tbColaboradoresPorSucursal
		WHERE cola_Id = @cola_Id AND  sucu_Id = @sucu_Id
END

--**************  PAGO ******************--
GO
CREATE OR ALTER PROCEDURE viaj.UDP_PagoTransportista 
(@viaj_Id INT)
AS
BEGIN
	DECLARE @Sucursal INT = (SELECT sucu_Id FROM viaj.tbViajes WHERE viaj_Id = @viaj_Id)
	DECLARE @Tarifa DECIMAL(18,2) = (SELECT tran_PagoKm FROM viaj.tbTransportistas WHERE tran_Id = (SELECT tran_Id FROM viaj.tbViajes WHERE viaj_Id = @viaj_Id))
	
	SELECT	SUM(cosu_DistanciaSucursal) * @Tarifa	AS Pago ,
			SUM(cosu_DistanciaSucursal)				AS Kilometraje
	FROM viaj.tbColaboradoresPorSucursal WHERE cola_Id IN (SELECT cola_Id FROM viaj.tbViajesDetalles WHERE viaj_Id = @viaj_Id) AND sucu_Id = @Sucursal
END

GO
CREATE OR ALTER PROCEDURE viaj.UDP_Reporte
(@tran_Id INT,
 @FechaInicio DATE,
 @FechaFin DATE)
AS
BEGIN
	SELECT	T1.viaj_Id, 
			tran_Id, 
			tran_NombreCompleto, 
			sucu_Id, 
			sucu_Nombre, 
			viaj_FechaViaje,
			(SELECT	SUM(cosu_DistanciaSucursal) * (SELECT tran_PagoKm FROM viaj.tbTransportistas WHERE tran_Id = (SELECT tran_Id FROM viaj.tbViajes WHERE viaj_Id = T1.viaj_Id)) FROM viaj.tbColaboradoresPorSucursal WHERE cola_Id IN (SELECT cola_Id FROM viaj.tbViajesDetalles WHERE viaj_Id = T1.viaj_Id) AND sucu_Id = (SELECT sucu_Id FROM viaj.tbViajes WHERE viaj_Id = T1.viaj_Id)) AS Pago,
			(SELECT SUM(cosu_DistanciaSucursal) FROM viaj.tbColaboradoresPorSucursal WHERE cola_Id IN (SELECT cola_Id FROM viaj.tbViajesDetalles WHERE viaj_Id = T1.viaj_Id) AND sucu_Id = (SELECT sucu_Id FROM viaj.tbViajes WHERE viaj_Id = T1.viaj_Id)) AS Kilometraje,

			(SELECT	vide_Id, viaj_Id, cola_Id, cola_NombreCompleto, cola_Identidad
			 FROM	viaj.VW_tbViajesDetalles T2
			 WHERE  T1.viaj_Id = T2.viaj_Id FOR JSON PATH) AS Detalles
			

	FROM	viaj.VW_tbViajes T1
	WHERE tran_Id = @tran_Id AND viaj_FechaViaje BETWEEN @FechaInicio AND @FechaFin
END

/*

GO
DECLARE @tran_Id INT = 1
DECLARE @FechaInicio DATE = '11/13/2023'
DECLARE @FechaFin DATE = '11/16/2023'
EXEC viaj.UDP_Reporte @tran_Id, @FechaInicio, @FechaFin

*/
