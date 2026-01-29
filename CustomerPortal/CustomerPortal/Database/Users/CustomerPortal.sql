USE [master]
GO

-- create CustomerPortal user login to the database
CREATE LOGIN [CustomerPortal] WITH PASSWORD=N'6e9kk!cnP', DEFAULT_DATABASE=[CustomerPortal], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO


USE [CustomerPortal]
GO

/****** Object:  User [CustomerPortal]    Script Date: 8/29/2019 10:22:55 AM ******/
CREATE USER [CustomerPortal] FOR LOGIN [CustomerPortal] 
GO

-- grant to execute all sprocs to CustomerPortal user
GRANT EXECUTE ON SCHEMA::dbo TO CustomerPortal