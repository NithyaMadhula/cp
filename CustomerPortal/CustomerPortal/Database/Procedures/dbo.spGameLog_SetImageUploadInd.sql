USE [CustomerPortal]
GO

DROP PROCEDURE IF EXISTS [dbo].[spGameLog_SetImageUploadInd]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*====================================================================================================  
Author	    : JBrillantes  
Date Created: 04/07/2020 
Description : Update GameLog image upload indicator

exec [dbo].[spGameLog_SetImageUploadInd] 
====================================================================================================*/ 
CREATE PROCEDURE [dbo].[spGameLog_SetImageUploadInd]
	@GraphicID int,
	@GameID int,
	@IsImageUploaded bit,
	@RetVal int OUTPUT
AS  
BEGIN  
	SET NOCOUNT ON

	SET @RetVal = 9999 

	IF EXISTS 
		(
			SELECT 
				'x' 
			FROM 
				dbo.GameLog gl
					--JOIN dbo.GameGraphic gg ON gl.GameID = gg.GameID
					JOIN [iGrade].[GMD].[dbo].[vwGameGraphics_SwtAccess] gg on gl.GameID = gg.GameTK
			WHERE 
				gg.GraphicTK = @GraphicID AND
				gl.GameID = @GameID AND 
				gl.IsImageUploaded = 0
		)
		BEGIN
			UPDATE 
				gl
			SET
				IsImageUploaded = @IsImageUploaded,
				DateUploaded = GetDate()
			FROM 
				dbo.GameLog gl
			WHERE 
				gl.GameID = @GameID AND 
				gl.IsImageUploaded = 0

			SET @RetVal = @@ERROR
		END

	RETURN @RetVal
END  
GO
