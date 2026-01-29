USE [CustomerPortal]
GO

DROP TABLE IF EXISTS [dbo].[PaperStockCategory]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PaperStockCategory](
	[ID] [smallint] NOT NULL,
	[Description] [varchar](24) NOT NULL
	CONSTRAINT [PK_PaperStockCategory] PRIMARY KEY CLUSTERED 
	(
		[ID] ASC
	) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
	CONSTRAINT [UK_PaperStockCategory_Description] UNIQUE NONCLUSTERED 
	(
		[Description] ASC
	) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

INSERT INTO [dbo].[PaperStockCategory]
	(ID, [Description])
VALUES
	(1000,		'Board'),
	(1100,		'Foil'),
	(1200,		'Holographic'),
	(1300,		'Undefined')