# Igt.InstantsShowcase

## Data Protection key ring table (SQL Server)

Create this table once in the existing database and keep it for all environments.

```sql
CREATE TABLE [dbo].[DataProtectionKeys] (
    [Id] INT IDENTITY(1,1) NOT NULL,
    [FriendlyName] NVARCHAR(256) NULL,
    [Xml] NVARCHAR(MAX) NOT NULL,
    CONSTRAINT [PK_DataProtectionKeys] PRIMARY KEY ([Id])
);
```
