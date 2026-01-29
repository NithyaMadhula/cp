USE [CustomerPortal]
GO

ALTER TABLE [dbo].[PaperStockType] DROP CONSTRAINT IF EXISTS [DF_PaperStockType_IsActive]
GO

ALTER TABLE [dbo].[PaperStockType] DROP CONSTRAINT IF EXISTS [DF_PaperStockType_Thickness]
GO

DROP TABLE IF EXISTS [dbo].[PaperStockType]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PaperStockType](
	[ID] [smallint] NOT NULL,
	[Description] [varchar](100) NOT NULL,
	[PaperStockCategoryID] [smallint] NOT NULL,
	[Thickness] [decimal](5, 2) NOT NULL,
	[IsActive] [bit] NOT NULL,
	CONSTRAINT [PK_PaperStockType] PRIMARY KEY CLUSTERED 
	(
		[ID] ASC
	) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
	CONSTRAINT [UK_PaperStockType_Description] UNIQUE NONCLUSTERED 
	(
		[Description] ASC
	) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[PaperStockType] ADD  CONSTRAINT [DF_PaperStockType_Thickness]  DEFAULT ((0)) FOR [Thickness]
GO

ALTER TABLE [dbo].[PaperStockType] ADD  CONSTRAINT [DF_PaperStockType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

CREATE NONCLUSTERED INDEX [idx_PaperStockType_PaperStockCategoryID] ON [dbo].[PaperStockType]
(
	[PaperStockCategoryID] ASC
) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO

--insert default values
INSERT INTO [dbo].[PaperStockType]
	([ID], [Description], PaperStockCategoryID, Thickness, IsActive)
VALUES
	(0,		'Undefined',			1300, 0.00,		1),
	(1,		'Copier',				1300, 0.00,		1),
	(2,		'None',					1300, 0.00,		1),
	(3,		'10pt C1S',				1000, 10.00,	0),
	(4,		'10pt C1S+',			1000, 10.00,	1),
	(5,		'8pt C2S',				1000, 8.00,		0),
	(6,		'10pt C2S',				1000, 10.00,	0),
	(7,		'12pt C1S',				1000, 12.00,	0),
	(8,		'12pt C2S',				1000, 12.00,	0),
	(9,		'10pt Foil',			1100, 10.00,	1),
	(10,	'10pt Foil, Uncoated',	1100, 10.00,	0),
	(11,	'8pt Foil',				1100, 8.00,		1),
	(12,	'8pt Foil, Uncoated',	1100, 8.00,		0),
	(13,	'10pt Holographic',		1200, 10.00,	1),
	(14,	'8pt Holographic',		1200, 8.00,		0),
	(15,	'8pt C1S',				1000, 8.00,		0),
	(16,	'4.5pt 80# Matte',		1000, 4.50,		1),
	(17,	'8pt C1S+',				1000, 8.00,		1),
	(18,	'12pt C1S+',			1000, 12.00,	1),
	(19,	'12pt C1S Recycled',	1000, 12.00,	1),
	(20,	'10pt C1S+ FSC',		1000, 10.00,	1)
