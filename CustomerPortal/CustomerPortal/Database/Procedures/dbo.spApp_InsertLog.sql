USE [CustomerPortal]
GO

DROP PROCEDURE IF EXISTS [dbo].[spApp_InsertLog] 

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].spApp_InsertLog
			@Date datetime
			,@Thread varchar(255)
			,@Level varchar(50)
			,@Logger varchar(255)
			,@Message varchar(4000)
			,@Exception varchar(2000)
			,@UserEmail varchar(255)
			,@UserIP varchar(16)
			,@LogEventType varchar(255)
AS
BEGIN
	SET NOCOUNT ON

	INSERT INTO [dbo].[Log]
		([Date], [Thread], [Level], [Logger], [Message], [Exception], [UserEmail], [UserIP], [LogEventType])
     VALUES
		(@Date 
		 ,@Thread
		 ,@Level			
		 ,@Logger			
		 ,@Message			
		 ,@Exception		
		 ,@UserEmail	
		 ,@UserIP
		 ,@LogEventType)    
END
GO


