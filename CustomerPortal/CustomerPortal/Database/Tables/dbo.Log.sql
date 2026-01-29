USE [CustomerPortal]
GO

DROP TABLE IF EXISTS [dbo].[Log]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Log] (
    [Id] [int] IDENTITY (1, 1) NOT NULL,
    [Date] [datetime] NOT NULL,
    [Thread] [varchar] (255) NOT NULL,
    [Level] [varchar] (50) NOT NULL,
    [Logger] [varchar] (255) NOT NULL,
    [Message] [varchar] (4000) NOT NULL,
    [Exception] [varchar] (2000) NULL,
	[UserEmail] [varchar] (255) NULL,
    [UserIP] [varchar] (16) NULL,
	[LogEventType] [varchar] (50) NULL    
)
