USE [master]
GO

CREATE DATABASE [budget_system]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'budget_system', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\budget_system.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'budget_system_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\budget_system_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [budget_system] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [budget_system].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [budget_system] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [budget_system] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [budget_system] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [budget_system] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [budget_system] SET ARITHABORT OFF 
GO
ALTER DATABASE [budget_system] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [budget_system] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [budget_system] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [budget_system] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [budget_system] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [budget_system] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [budget_system] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [budget_system] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [budget_system] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [budget_system] SET  ENABLE_BROKER 
GO
ALTER DATABASE [budget_system] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [budget_system] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [budget_system] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [budget_system] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [budget_system] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [budget_system] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [budget_system] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [budget_system] SET RECOVERY FULL 
GO
ALTER DATABASE [budget_system] SET  MULTI_USER 
GO
ALTER DATABASE [budget_system] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [budget_system] SET DB_CHAINING OFF 
GO
ALTER DATABASE [budget_system] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [budget_system] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [budget_system] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [budget_system] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'budget_system', N'ON'
GO
ALTER DATABASE [budget_system] SET QUERY_STORE = OFF
GO
USE [budget_system]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[adminExpenses](
	[id_expenses] [int] IDENTITY(1,1) NOT NULL,
	[value] [nvarchar](100) NOT NULL,
	[id_date] [int] NULL,
	[id_concept] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_expenses] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[budgets](
	[id_budget] [int] IDENTITY(1,1) NOT NULL,
	[proyect] [nvarchar](100) NOT NULL,
	[version] [nvarchar](10) NOT NULL,
	[active] [bit] NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
	[id_user] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_budget] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[concepts](
	[id_concept] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_concept] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[direct_costs](
	[id_costD] [int] IDENTITY(1,1) NOT NULL,
	[value] [nvarchar](100) NOT NULL,
	[id_date] [int] NULL,
	[id_concept] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_costD] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[incomes](
	[id_income] [int] IDENTITY(1,1) NOT NULL,
	[value] [nvarchar](100) NOT NULL,
	[id_date] [int] NULL,
	[id_concept] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_income] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[periods](
	[id_date] [int] IDENTITY(1,1) NOT NULL,
	[month] [nvarchar](15) NOT NULL,
	[age] [nvarchar](6) NOT NULL,
	[income] [nvarchar](15) NOT NULL,
	[id_budget] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[resources](
	[id_resource] [int] IDENTITY(1,1) NOT NULL,
	[role] [nvarchar](50) NOT NULL,
	[cost] [nvarchar](15) NOT NULL,
	[percentage] [nvarchar](15) NOT NULL,
	[id_date] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_resource] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id_user] [int] IDENTITY(1,1) NOT NULL,
	[names] [nvarchar](50) NOT NULL,
	[last_names] [nvarchar](50) NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[userName] [nvarchar](10) NOT NULL,
	[password] [nvarchar](15) NOT NULL,
	[phone_number] [nvarchar](15) NOT NULL,
	[active] [nvarchar](15) NOT NULL,
	[role] [nvarchar](15) NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[adminExpenses] ON 

INSERT [dbo].[adminExpenses] ([id_expenses], [value], [id_date], [id_concept]) VALUES (1, N'547', 1, 2)
INSERT [dbo].[adminExpenses] ([id_expenses], [value], [id_date], [id_concept]) VALUES (2, N'5748', 1, 2)
INSERT [dbo].[adminExpenses] ([id_expenses], [value], [id_date], [id_concept]) VALUES (3, N'5895', 2, 2)
INSERT [dbo].[adminExpenses] ([id_expenses], [value], [id_date], [id_concept]) VALUES (4, N'5895', 2, 2)
INSERT [dbo].[adminExpenses] ([id_expenses], [value], [id_date], [id_concept]) VALUES (5, N'321', 3, 2)
INSERT [dbo].[adminExpenses] ([id_expenses], [value], [id_date], [id_concept]) VALUES (6, N'123', 3, 2)
INSERT [dbo].[adminExpenses] ([id_expenses], [value], [id_date], [id_concept]) VALUES (7, N'2344', 4, 2)
INSERT [dbo].[adminExpenses] ([id_expenses], [value], [id_date], [id_concept]) VALUES (8, N'4234', 4, 2)
SET IDENTITY_INSERT [dbo].[adminExpenses] OFF
GO
SET IDENTITY_INSERT [dbo].[budgets] ON 

INSERT [dbo].[budgets] ([id_budget], [proyect], [version], [active], [createdAt], [updatedAt], [id_user]) VALUES (1, N'Vgeneris game', N'1.0.0', 1, CAST(N'2021-08-20T17:11:31.8810000+00:00' AS DateTimeOffset), CAST(N'2021-08-20T17:11:31.8810000+00:00' AS DateTimeOffset), 1)
INSERT [dbo].[budgets] ([id_budget], [proyect], [version], [active], [createdAt], [updatedAt], [id_user]) VALUES (2, N'Agenta cooperativa', N'1.0.0', 1, CAST(N'2021-08-20T17:13:29.1150000+00:00' AS DateTimeOffset), CAST(N'2021-08-20T17:13:29.1150000+00:00' AS DateTimeOffset), 1)
SET IDENTITY_INSERT [dbo].[budgets] OFF
GO
SET IDENTITY_INSERT [dbo].[concepts] ON 

INSERT [dbo].[concepts] ([id_concept], [name]) VALUES (1, N'Accesorios Oficina')
INSERT [dbo].[concepts] ([id_concept], [name]) VALUES (2, N'Mobiliario')
INSERT [dbo].[concepts] ([id_concept], [name]) VALUES (3, N'Accesorios escolares')
INSERT [dbo].[concepts] ([id_concept], [name]) VALUES (4, N'Tintas, toners')
INSERT [dbo].[concepts] ([id_concept], [name]) VALUES (5, N'Almacenamiento')
SET IDENTITY_INSERT [dbo].[concepts] OFF
GO
SET IDENTITY_INSERT [dbo].[direct_costs] ON 

INSERT [dbo].[direct_costs] ([id_costD], [value], [id_date], [id_concept]) VALUES (1, N'5789', 1, 2)
INSERT [dbo].[direct_costs] ([id_costD], [value], [id_date], [id_concept]) VALUES (2, N'2514', 1, 2)
INSERT [dbo].[direct_costs] ([id_costD], [value], [id_date], [id_concept]) VALUES (3, N'2564', 2, 2)
INSERT [dbo].[direct_costs] ([id_costD], [value], [id_date], [id_concept]) VALUES (4, N'2005', 2, 2)
INSERT [dbo].[direct_costs] ([id_costD], [value], [id_date], [id_concept]) VALUES (5, N'1234', 3, 2)
INSERT [dbo].[direct_costs] ([id_costD], [value], [id_date], [id_concept]) VALUES (6, N'3123', 3, 2)
INSERT [dbo].[direct_costs] ([id_costD], [value], [id_date], [id_concept]) VALUES (7, N'324', 4, 2)
INSERT [dbo].[direct_costs] ([id_costD], [value], [id_date], [id_concept]) VALUES (8, N'324', 4, 2)
SET IDENTITY_INSERT [dbo].[direct_costs] OFF
GO
SET IDENTITY_INSERT [dbo].[incomes] ON 

INSERT [dbo].[incomes] ([id_income], [value], [id_date], [id_concept]) VALUES (1, N'5845', 1, 2)
INSERT [dbo].[incomes] ([id_income], [value], [id_date], [id_concept]) VALUES (2, N'547', 1, 2)
INSERT [dbo].[incomes] ([id_income], [value], [id_date], [id_concept]) VALUES (3, N'5898', 2, 2)
INSERT [dbo].[incomes] ([id_income], [value], [id_date], [id_concept]) VALUES (4, N'9874', 2, 2)
INSERT [dbo].[incomes] ([id_income], [value], [id_date], [id_concept]) VALUES (5, N'158', 3, 2)
INSERT [dbo].[incomes] ([id_income], [value], [id_date], [id_concept]) VALUES (6, N'547', 3, 2)
INSERT [dbo].[incomes] ([id_income], [value], [id_date], [id_concept]) VALUES (7, N'423', 4, 2)
INSERT [dbo].[incomes] ([id_income], [value], [id_date], [id_concept]) VALUES (8, N'3244', 4, 2)
SET IDENTITY_INSERT [dbo].[incomes] OFF
GO
SET IDENTITY_INSERT [dbo].[periods] ON 

INSERT [dbo].[periods] ([id_date], [month], [age], [income], [id_budget]) VALUES (1, N'Febrero', N'2021', N'2500', 1)
INSERT [dbo].[periods] ([id_date], [month], [age], [income], [id_budget]) VALUES (2, N'Marzo', N'2021', N'5784', 1)
INSERT [dbo].[periods] ([id_date], [month], [age], [income], [id_budget]) VALUES (3, N'Abril', N'2021', N'2500', 2)
INSERT [dbo].[periods] ([id_date], [month], [age], [income], [id_budget]) VALUES (4, N'Mayo', N'2021', N'2345', 2)
SET IDENTITY_INSERT [dbo].[periods] OFF
GO
SET IDENTITY_INSERT [dbo].[resources] ON 

INSERT [dbo].[resources] ([id_resource], [role], [cost], [percentage], [id_date]) VALUES (1, N'rol 1', N'125', N'50', 1)
INSERT [dbo].[resources] ([id_resource], [role], [cost], [percentage], [id_date]) VALUES (2, N'rol 2', N'265', N'10', 1)
INSERT [dbo].[resources] ([id_resource], [role], [cost], [percentage], [id_date]) VALUES (3, N'rol 1', N'1000', N'50', 2)
INSERT [dbo].[resources] ([id_resource], [role], [cost], [percentage], [id_date]) VALUES (4, N'rol 3', N'1800', N'50', 2)
INSERT [dbo].[resources] ([id_resource], [role], [cost], [percentage], [id_date]) VALUES (5, N'rol 1', N'4353', N'50', 3)
INSERT [dbo].[resources] ([id_resource], [role], [cost], [percentage], [id_date]) VALUES (6, N'rol 2', N'2635', N'10', 3)
INSERT [dbo].[resources] ([id_resource], [role], [cost], [percentage], [id_date]) VALUES (7, N'rol 1', N'2344', N'50', 4)
INSERT [dbo].[resources] ([id_resource], [role], [cost], [percentage], [id_date]) VALUES (8, N'rol 3', N'234', N'50', 4)
SET IDENTITY_INSERT [dbo].[resources] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([id_user], [names], [last_names], [email], [userName], [password], [phone_number], [active], [role], [createdAt], [updatedAt]) VALUES (1, N'Emmanuel', N'Pérez', N'emmanuelprz17@gmail.com', N'emmaprz', N'prueba1234', N'5512345678', N'1', N'user', CAST(N'2021-08-20T17:09:34.7060000+00:00' AS DateTimeOffset), CAST(N'2021-08-20T17:09:34.7060000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id_user], [names], [last_names], [email], [userName], [password], [phone_number], [active], [role], [createdAt], [updatedAt]) VALUES (2, N'Michelle', N'Toscano', N'mich@gmail.com', N'mich', N'prueba1', N'5512345698', N'1', N'user', CAST(N'2021-08-20T17:10:22.1210000+00:00' AS DateTimeOffset), CAST(N'2021-08-20T17:10:22.1210000+00:00' AS DateTimeOffset))
SET IDENTITY_INSERT [dbo].[users] OFF
GO
ALTER TABLE [dbo].[adminExpenses]  WITH CHECK ADD FOREIGN KEY([id_concept])
REFERENCES [dbo].[concepts] ([id_concept])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[adminExpenses]  WITH CHECK ADD FOREIGN KEY([id_date])
REFERENCES [dbo].[periods] ([id_date])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[budgets]  WITH CHECK ADD FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id_user])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[direct_costs]  WITH CHECK ADD FOREIGN KEY([id_concept])
REFERENCES [dbo].[concepts] ([id_concept])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[direct_costs]  WITH CHECK ADD FOREIGN KEY([id_date])
REFERENCES [dbo].[periods] ([id_date])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[incomes]  WITH CHECK ADD FOREIGN KEY([id_concept])
REFERENCES [dbo].[concepts] ([id_concept])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[incomes]  WITH CHECK ADD FOREIGN KEY([id_date])
REFERENCES [dbo].[periods] ([id_date])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[periods]  WITH CHECK ADD FOREIGN KEY([id_budget])
REFERENCES [dbo].[budgets] ([id_budget])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[resources]  WITH CHECK ADD FOREIGN KEY([id_date])
REFERENCES [dbo].[periods] ([id_date])
ON DELETE CASCADE
GO
USE [master]
GO
ALTER DATABASE [budget_system] SET  READ_WRITE 
GO