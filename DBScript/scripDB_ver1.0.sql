USE [SWP391_SP25]
GO
/****** Object:  Table [dbo].[account]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[account](
	[gender] [bit] NULL,
	[is_active] [bit] NULL,
	[birth_date] [datetime2](6) NULL,
	[created_at] [datetime2](6) NULL,
	[accountid] [varchar](255) NOT NULL,
	[avatar] [varchar](255) NULL,
	[email] [varchar](255) NULL,
	[password] [varchar](255) NOT NULL,
	[phone_number] [varchar](255) NOT NULL,
	[roleid] [varchar](255) NULL,
	[username] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[accountid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category](
	[categoryid] [varchar](255) NOT NULL,
	[description] [varchar](255) NULL,
	[name] [varchar](255) NOT NULL,
	[storeid] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[categoryid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customer]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customer](
	[address] [varchar](255) NULL,
	[customerid] [varchar](255) NOT NULL,
	[email] [varchar](255) NULL,
	[name] [varchar](255) NOT NULL,
	[phone_number] [varchar](255) NULL,
	[storeid] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[customerid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[debt]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[debt](
	[amount] [float] NOT NULL,
	[date] [date] NOT NULL,
	[customerid] [varchar](255) NULL,
	[debtid] [varchar](255) NOT NULL,
	[description] [varchar](255) NULL,
	[status] [varchar](255) NOT NULL,
	[storeid] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[debtid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[employee]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee](
	[accountid] [varchar](255) NULL,
	[employeeid] [varchar](255) NOT NULL,
	[storeid] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[employeeid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[has_attribute]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[has_attribute](
	[product_attributeid] [varchar](255) NOT NULL,
	[productid] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[product_attributeid] ASC,
	[productid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[has_permission]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[has_permission](
	[permissionid] [varchar](255) NOT NULL,
	[roleid] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[permissionid] ASC,
	[roleid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[invoice]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[invoice](
	[product_money] [float] NOT NULL,
	[ship_money] [float] NOT NULL,
	[status] [bit] NOT NULL,
	[type] [bit] NOT NULL,
	[created_at] [datetime2](6) NOT NULL,
	[customerid] [varchar](255) NULL,
	[description] [varchar](255) NULL,
	[invoiceid] [varchar](255) NOT NULL,
	[storeid] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[invoiceid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[invoice_detail]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[invoice_detail](
	[discount] [int] NULL,
	[quantity] [bigint] NOT NULL,
	[invoice_detailid] [varchar](255) NOT NULL,
	[invoiceid] [varchar](255) NULL,
	[productid] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[invoice_detailid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[notification]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[notification](
	[is_read] [bit] NULL,
	[send_at] [datetime2](6) NOT NULL,
	[accountid] [varchar](255) NULL,
	[message] [varchar](255) NOT NULL,
	[notificationid] [varchar](255) NOT NULL,
	[target_accountid] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[notificationid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[permission]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[permission](
	[code] [varchar](255) NOT NULL,
	[description] [varchar](255) NULL,
	[permissionid] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[permissionid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product](
	[price] [float] NOT NULL,
	[categoryid] [varchar](255) NULL,
	[information] [varchar](255) NULL,
	[name] [varchar](255) NOT NULL,
	[product_image] [varchar](255) NOT NULL,
	[productid] [varchar](255) NOT NULL,
	[storeid] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[productid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_attribute]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_attribute](
	[product_attributeid] [varchar](255) NOT NULL,
	[storeid] [varchar](255) NULL,
	[value] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[product_attributeid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role](
	[code] [varchar](255) NOT NULL,
	[description] [varchar](255) NULL,
	[roleid] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[roleid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[store]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[store](
	[created_at] [datetime2](6) NULL,
	[expire_at] [datetime2](6) NULL,
	[accountid] [varchar](255) NULL,
	[address] [varchar](255) NOT NULL,
	[description] [varchar](255) NOT NULL,
	[hotline] [varchar](255) NOT NULL,
	[image] [varchar](255) NOT NULL,
	[operating_hour] [varchar](255) NOT NULL,
	[store_name] [varchar](255) NOT NULL,
	[storeid] [varchar](255) NOT NULL,
	[subscription_planid] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[storeid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[store_statistics]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[store_statistics](
	[total_money] [float] NULL,
	[type] [bit] NULL,
	[date] [datetime2](6) NULL,
	[description] [varchar](255) NULL,
	[statisticsid] [varchar](255) NOT NULL,
	[storeid] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[statisticsid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[subscription_plan]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[subscription_plan](
	[price] [float] NULL,
	[description] [varchar](255) NULL,
	[name] [varchar](255) NULL,
	[subscription_planid] [varchar](255) NOT NULL,
	[time_of_expiration] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[subscription_planid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[zone]    Script Date: 22/01/2025 12:04:53 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[zone](
	[quantity] [bigint] NOT NULL,
	[size] [bigint] NOT NULL,
	[location] [varchar](255) NOT NULL,
	[name] [varchar](255) NOT NULL,
	[productid] [varchar](255) NULL,
	[storeid] [varchar](255) NULL,
	[zoneid] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[zoneid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[account] ([gender], [is_active], [birth_date], [created_at], [accountid], [avatar], [email], [password], [phone_number], [roleid], [username]) VALUES (NULL, 1, NULL, CAST(N'2025-01-20T20:40:12.6233330' AS DateTime2), N'1', NULL, N'admin@example.com', N'123', N'0123456789', N'1', N'admin_user')
INSERT [dbo].[account] ([gender], [is_active], [birth_date], [created_at], [accountid], [avatar], [email], [password], [phone_number], [roleid], [username]) VALUES (NULL, 1, NULL, CAST(N'2025-01-20T20:40:12.6233330' AS DateTime2), N'2', NULL, N'storeowner@example.com', N'123', N'0987654321', N'2', N'store_owner')
INSERT [dbo].[account] ([gender], [is_active], [birth_date], [created_at], [accountid], [avatar], [email], [password], [phone_number], [roleid], [username]) VALUES (NULL, 1, NULL, CAST(N'2025-01-20T20:40:12.6233330' AS DateTime2), N'3', NULL, N'employee1@example.com', N'123', N'0112233445', N'3', N'employee_1')
INSERT [dbo].[account] ([gender], [is_active], [birth_date], [created_at], [accountid], [avatar], [email], [password], [phone_number], [roleid], [username]) VALUES (NULL, 1, NULL, CAST(N'2025-01-20T20:40:12.6233330' AS DateTime2), N'4', NULL, N'employee2@example.com', N'123', N'0998877665', N'3', N'employee_2')
INSERT [dbo].[account] ([gender], [is_active], [birth_date], [created_at], [accountid], [avatar], [email], [password], [phone_number], [roleid], [username]) VALUES (1, 0, CAST(N'2002-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2025-01-21T00:00:00.0000000' AS DateTime2), N'5', NULL, N'owner5@exam.com', N'123', N'0912345678', N'2', N'owner5')
INSERT [dbo].[account] ([gender], [is_active], [birth_date], [created_at], [accountid], [avatar], [email], [password], [phone_number], [roleid], [username]) VALUES (1, 0, CAST(N'2000-02-02T00:00:00.0000000' AS DateTime2), CAST(N'2025-01-21T00:00:00.0000000' AS DateTime2), N'6', NULL, N'owner6@exam.com', N'123', N'0987612345', N'2', N'owner6')
INSERT [dbo].[account] ([gender], [is_active], [birth_date], [created_at], [accountid], [avatar], [email], [password], [phone_number], [roleid], [username]) VALUES (0, 1, CAST(N'2001-03-02T00:00:00.0000000' AS DateTime2), CAST(N'2025-01-02T00:00:00.0000000' AS DateTime2), N'7', NULL, N'owner7@gmail.com', N'123', N'0982314567', N'2', N'onwer7')
GO
INSERT [dbo].[category] ([categoryid], [description], [name], [storeid]) VALUES (N'1', N'G?o thom cao c?p, hoàn h?o cho vi?c n?u an hàng ngày.', N'G?o Jasmine', N'1')
INSERT [dbo].[category] ([categoryid], [description], [name], [storeid]) VALUES (N'2', N'G?o l?t nguyên cám, giàu dinh du?ng và t?t cho s?c kh?e.', N'G?o L?t', N'1')
INSERT [dbo].[category] ([categoryid], [description], [name], [storeid]) VALUES (N'3', N'G?o h?t dài, thom, lý tu?ng cho các món com biryani và pilaf.', N'G?o Basmati', N'2')
INSERT [dbo].[category] ([categoryid], [description], [name], [storeid]) VALUES (N'4', N'Hoàn h?o cho các món tráng mi?ng truy?n th?ng và các món xôi.', N'N?p', N'2')
INSERT [dbo].[category] ([categoryid], [description], [name], [storeid]) VALUES (N'5', N'G?o dã du?c h?p s?n, d? dàng n?u và b?o qu?n trong th?i gian dài.', N'G?o H?p', N'1')
GO
INSERT [dbo].[customer] ([address], [customerid], [email], [name], [phone_number], [storeid]) VALUES (N'123 Ðu?ng 1, Qu?n 1, TP. HCM', N'1', N'nguyenvana@example.com', N'Nguyen Van A', N'0987654321', N'1')
INSERT [dbo].[customer] ([address], [customerid], [email], [name], [phone_number], [storeid]) VALUES (N'456 Ðu?ng 2, Qu?n 2, TP. HCM', N'2', N'tranthib@example.com', N'Tran Thi B', N'0912345678', N'1')
INSERT [dbo].[customer] ([address], [customerid], [email], [name], [phone_number], [storeid]) VALUES (N'789 Ðu?ng 3, Qu?n 3, TP. HCM', N'3', N'lehoangc@example.com', N'Le Hoang C', N'0901234567', N'2')
INSERT [dbo].[customer] ([address], [customerid], [email], [name], [phone_number], [storeid]) VALUES (N'12 Ðu?ng 4, Qu?n 4, TP. HCM', N'4', N'phamminhd@example.com', N'Pham Minh D', N'0976543210', N'2')
INSERT [dbo].[customer] ([address], [customerid], [email], [name], [phone_number], [storeid]) VALUES (N'34 Ðu?ng 5, Qu?n 5, TP. HCM', N'5', N'nguyenthie@example.com', N'Nguyen Thi E', N'0965432109', N'1')
GO
INSERT [dbo].[debt] ([amount], [date], [customerid], [debtid], [description], [status], [storeid]) VALUES (500000, CAST(N'2023-10-01' AS Date), N'1', N'1', N'Mua g?o Jasmine Lo?i 1', N'Unpaid', N'1')
INSERT [dbo].[debt] ([amount], [date], [customerid], [debtid], [description], [status], [storeid]) VALUES (300000, CAST(N'2023-10-05' AS Date), N'2', N'2', N'Mua g?o Basmati ?n Ð?', N'Paid', N'1')
INSERT [dbo].[debt] ([amount], [date], [customerid], [debtid], [description], [status], [storeid]) VALUES (450000, CAST(N'2023-10-10' AS Date), N'3', N'3', N'Mua g?o L?t Ð?', N'Unpaid', N'2')
INSERT [dbo].[debt] ([amount], [date], [customerid], [debtid], [description], [status], [storeid]) VALUES (600000, CAST(N'2023-10-15' AS Date), N'4', N'4', N'Mua N?p Truy?n Th?ng', N'Paid', N'2')
INSERT [dbo].[debt] ([amount], [date], [customerid], [debtid], [description], [status], [storeid]) VALUES (700000, CAST(N'2023-10-18' AS Date), N'5', N'5', N'Mua g?o H?p Lo?i 1', N'Unpaid', N'1')
GO
INSERT [dbo].[employee] ([accountid], [employeeid], [storeid]) VALUES (N'3', N'1', N'1')
INSERT [dbo].[employee] ([accountid], [employeeid], [storeid]) VALUES (N'4', N'2', N'1')
GO
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'1', N'1')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'1', N'2')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'1', N'5')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'1', N'6')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'2', N'1')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'2', N'2')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'2', N'5')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'2', N'6')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'3', N'1')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'3', N'2')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'3', N'7')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'3', N'8')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'4', N'3')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'4', N'4')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'5', N'3')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'5', N'4')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'5', N'7')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'5', N'8')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'6', N'3')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'6', N'4')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'7', N'10')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'7', N'5')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'7', N'6')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'7', N'9')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'8', N'10')
INSERT [dbo].[has_attribute] ([product_attributeid], [productid]) VALUES (N'8', N'9')
GO
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'1', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'10', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'10', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'10', N'3')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'11', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'12', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'13', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'14', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'15', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'16', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'17', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'18', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'18', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'19', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'19', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'2', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'20', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'20', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'21', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'22', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'23', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'24', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'25', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'26', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'27', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'28', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'29', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'3', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'30', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'31', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'32', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'33', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'34', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'34', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'34', N'3')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'35', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'35', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'35', N'3')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'36', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'36', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'37', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'38', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'38', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'39', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'39', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'4', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'40', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'40', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'41', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'42', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'43', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'44', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'45', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'46', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'46', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'46', N'3')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'47', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'47', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'47', N'3')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'48', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'48', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'49', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'5', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'50', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'50', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'50', N'3')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'51', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'51', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'51', N'3')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'52', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'53', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'6', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'7', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'8', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'9', N'1')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'9', N'2')
INSERT [dbo].[has_permission] ([permissionid], [roleid]) VALUES (N'9', N'3')
GO
INSERT [dbo].[invoice] ([product_money], [ship_money], [status], [type], [created_at], [customerid], [description], [invoiceid], [storeid]) VALUES (500000, 20000, 1, 1, CAST(N'2023-11-01T10:00:00.0000000' AS DateTime2), N'1', N'Mua g?o Jasmine Lo?i 1', N'1', N'1')
INSERT [dbo].[invoice] ([product_money], [ship_money], [status], [type], [created_at], [customerid], [description], [invoiceid], [storeid]) VALUES (700000, 25000, 0, 1, CAST(N'2023-11-04T10:15:00.0000000' AS DateTime2), N'5', N'Mua g?o H?p Ð?c Bi?t', N'10', N'1')
INSERT [dbo].[invoice] ([product_money], [ship_money], [status], [type], [created_at], [customerid], [description], [invoiceid], [storeid]) VALUES (300000, 15000, 1, 1, CAST(N'2023-11-01T11:30:00.0000000' AS DateTime2), N'2', N'Mua g?o Basmati ?n Ð?', N'2', N'1')
INSERT [dbo].[invoice] ([product_money], [ship_money], [status], [type], [created_at], [customerid], [description], [invoiceid], [storeid]) VALUES (450000, 25000, 0, 0, CAST(N'2023-11-01T14:00:00.0000000' AS DateTime2), N'3', N'Mua g?o L?t Ð?', N'3', N'2')
INSERT [dbo].[invoice] ([product_money], [ship_money], [status], [type], [created_at], [customerid], [description], [invoiceid], [storeid]) VALUES (600000, 30000, 0, 1, CAST(N'2023-11-02T10:00:00.0000000' AS DateTime2), N'4', N'Mua N?p Truy?n Th?ng', N'4', N'2')
INSERT [dbo].[invoice] ([product_money], [ship_money], [status], [type], [created_at], [customerid], [description], [invoiceid], [storeid]) VALUES (700000, 20000, 0, 1, CAST(N'2023-11-02T12:00:00.0000000' AS DateTime2), N'5', N'Mua g?o H?p Lo?i 1', N'5', N'1')
INSERT [dbo].[invoice] ([product_money], [ship_money], [status], [type], [created_at], [customerid], [description], [invoiceid], [storeid]) VALUES (500000, 15000, 0, 0, CAST(N'2023-11-02T15:00:00.0000000' AS DateTime2), N'1', N'Mua g?o Jasmine Lo?i 2', N'6', N'1')
INSERT [dbo].[invoice] ([product_money], [ship_money], [status], [type], [created_at], [customerid], [description], [invoiceid], [storeid]) VALUES (800000, 25000, 1, 1, CAST(N'2023-11-03T09:30:00.0000000' AS DateTime2), N'2', N'Mua g?o Basmati Cao C?p', N'7', N'1')
INSERT [dbo].[invoice] ([product_money], [ship_money], [status], [type], [created_at], [customerid], [description], [invoiceid], [storeid]) VALUES (450000, 30000, 0, 1, CAST(N'2023-11-03T11:00:00.0000000' AS DateTime2), N'3', N'Mua N?p Thái Lo?i 1', N'8', N'2')
INSERT [dbo].[invoice] ([product_money], [ship_money], [status], [type], [created_at], [customerid], [description], [invoiceid], [storeid]) VALUES (500000, 20000, 1, 0, CAST(N'2023-11-03T13:45:00.0000000' AS DateTime2), N'4', N'Mua g?o L?t Ðen', N'9', N'2')
GO
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (10, 5, N'1', N'1', N'1')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (50, 1, N'10', N'10', N'5')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (15, 3, N'11', N'1', N'1')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (25, 9, N'12', N'2', N'2')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (10, 4, N'13', N'3', N'3')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (20, 6, N'14', N'4', N'4')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (5, 12, N'15', N'5', N'5')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (5, 3, N'2', N'2', N'2')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (15, 2, N'3', N'3', N'3')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (20, 4, N'4', N'4', N'4')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (0, 6, N'5', N'5', N'5')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (10, 7, N'6', N'6', N'1')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (5, 2, N'7', N'7', N'2')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (30, 8, N'8', N'8', N'3')
INSERT [dbo].[invoice_detail] ([discount], [quantity], [invoice_detailid], [invoiceid], [productid]) VALUES (20, 10, N'9', N'9', N'4')
GO
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_USER', N'Permission to read user data', N'1')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'CREATE_INVOICE', N'Permission to create new invoices', N'10')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_ACCOUNT', N'Permission to read account data', N'11')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'UPDATE_ACCOUNT', N'Permission to update existing accounts', N'12')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_ACCOUNT', N'Permission to delete accounts', N'13')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_EMPLOYEE', N'Permission to read employee data', N'14')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'CREATE_EMPLOYEE', N'Permission to create new employees', N'15')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'UPDATE_EMPLOYEE', N'Permission to update existing employees', N'16')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_EMPLOYEE', N'Permission to delete employees', N'17')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_STORE', N'Permission to read store data', N'18')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'CREATE_STORE', N'Permission to create new stores', N'19')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'WRITE_USER', N'Permission to write user data', N'2')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'UPDATE_STORE', N'Permission to update existing stores', N'20')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_STORE', N'Permission to delete stores', N'21')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_SUBSCRIPTION_PLAN', N'Permission to read subscription plan data', N'22')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'CREATE_SUBSCRIPTION_PLAN', N'Permission to create new subscription plans', N'23')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'UPDATE_SUBSCRIPTION_PLAN', N'Permission to update existing subscription plans', N'24')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_SUBSCRIPTION_PLAN', N'Permission to delete subscription plans', N'25')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_STATISTICS', N'Permission to read store statistics data', N'26')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'CREATE_STATISTICS', N'Permission to create new store statistics', N'27')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'UPDATE_STATISTICS', N'Permission to update existing store statistics', N'28')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_STATISTICS', N'Permission to delete store statistics', N'29')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_USER', N'Permission to delete user data', N'3')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_ZONE', N'Permission to read zone data', N'30')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'CREATE_ZONE', N'Permission to create new zones', N'31')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'UPDATE_ZONE', N'Permission to update existing zones', N'32')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_ZONE', N'Permission to delete zones', N'33')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_PRODUCT', N'Permission to read product data', N'34')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'CREATE_PRODUCT', N'Permission to create new products', N'35')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'UPDATE_PRODUCT', N'Permission to update existing products', N'36')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_PRODUCT', N'Permission to delete products', N'37')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_CATEGORY', N'Permission to read category data', N'38')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'CREATE_CATEGORY', N'Permission to create new categories', N'39')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_PERMISSION', N'Permission to read permissions', N'4')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'UPDATE_CATEGORY', N'Permission to update existing categories', N'40')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_CATEGORY', N'Permission to delete categories', N'41')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_PRODUCT_ATTRIBUTE', N'Permission to read product attribute data', N'42')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'CREATE_PRODUCT_ATTRIBUTE', N'Permission to create new product attributes', N'43')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'UPDATE_PRODUCT_ATTRIBUTE', N'Permission to update existing product attributes', N'44')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_PRODUCT_ATTRIBUTE', N'Permission to delete product attributes', N'45')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_CUSTOMER', N'Permission to read customer data', N'46')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'CREATE_CUSTOMER', N'Permission to create new customers', N'47')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'UPDATE_CUSTOMER', N'Permission to update existing customers', N'48')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_CUSTOMER', N'Permission to delete customers', N'49')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_ROLE', N'Permission to read role data', N'5')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_DEBT', N'Permission to read debt data', N'50')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'CREATE_DEBT', N'Permission to create new debts', N'51')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'UPDATE_DEBT', N'Permission to update existing debts', N'52')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_DEBT', N'Permission to delete debts', N'53')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'CREATE_ROLE', N'Permission to create new roles', N'6')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'UPDATE_ROLE', N'Permission to update existing roles', N'7')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'DELETE_ROLE', N'Permission to delete roles', N'8')
INSERT [dbo].[permission] ([code], [description], [permissionid]) VALUES (N'READ_INVOICE', N'Permission to read invoice data', N'9')
GO
INSERT [dbo].[product] ([price], [categoryid], [information], [name], [product_image], [productid], [storeid]) VALUES (20000, N'1', N'G?o thom cao c?p, h?t dài, thích h?p cho b?a an gia dình.', N'G?o Jasmine Lo?i 1', N'jasmine_1.jpg', N'1', N'1')
INSERT [dbo].[product] ([price], [categoryid], [information], [name], [product_image], [productid], [storeid]) VALUES (28000, N'5', N'G?o h?p giàu dinh du?ng và b?o qu?n lâu dài.', N'G?o H?p Ð?c Bi?t', N'parboiled_2.jpg', N'10', N'1')
INSERT [dbo].[product] ([price], [categoryid], [information], [name], [product_image], [productid], [storeid]) VALUES (25000, N'1', N'G?o Jasmine xu?t kh?u, n?u chín m?m và thom.', N'G?o Jasmine Lo?i 2', N'jasmine_2.jpg', N'2', N'1')
INSERT [dbo].[product] ([price], [categoryid], [information], [name], [product_image], [productid], [storeid]) VALUES (30000, N'2', N'G?o l?t d?, giàu dinh du?ng và t?t cho s?c kh?e.', N'G?o L?t Ð?', N'brown_red.jpg', N'3', N'1')
INSERT [dbo].[product] ([price], [categoryid], [information], [name], [product_image], [productid], [storeid]) VALUES (32000, N'2', N'G?o l?t den, giàu ch?t ch?ng oxy hóa và vitamin.', N'G?o L?t Ðen', N'brown_black.jpg', N'4', N'1')
INSERT [dbo].[product] ([price], [categoryid], [information], [name], [product_image], [productid], [storeid]) VALUES (45000, N'3', N'G?o Basmati nh?p kh?u, thích h?p v?i các món an ?n.', N'G?o Basmati ?n Ð?', N'basmati_1.jpg', N'5', N'2')
INSERT [dbo].[product] ([price], [categoryid], [information], [name], [product_image], [productid], [storeid]) VALUES (48000, N'3', N'G?o Basmati cao c?p v?i huong thom t? nhiên.', N'G?o Basmati Cao C?p', N'basmati_2.jpg', N'6', N'2')
INSERT [dbo].[product] ([price], [categoryid], [information], [name], [product_image], [productid], [storeid]) VALUES (25000, N'4', N'N?p truy?n th?ng, thích h?p n?u xôi và các món an truy?n th?ng.', N'N?p Truy?n Th?ng', N'sticky_rice.jpg', N'7', N'2')
INSERT [dbo].[product] ([price], [categoryid], [information], [name], [product_image], [productid], [storeid]) VALUES (26000, N'4', N'N?p Thái h?t tròn, d?o ngon, phù h?p m?i món an d?c bi?t.', N'N?p Thái Lo?i 1', N'sticky_rice_thai.jpg', N'8', N'2')
INSERT [dbo].[product] ([price], [categoryid], [information], [name], [product_image], [productid], [storeid]) VALUES (22000, N'5', N'G?o h?p s?n, d? dàng ch? bi?n m?i món an.', N'G?o H?p Lo?i 1', N'parboiled_1.jpg', N'9', N'1')
GO
INSERT [dbo].[product_attribute] ([product_attributeid], [storeid], [value]) VALUES (N'1', N'1', N'H?t dài')
INSERT [dbo].[product_attribute] ([product_attributeid], [storeid], [value]) VALUES (N'2', N'1', N'Thom t? nhiên')
INSERT [dbo].[product_attribute] ([product_attributeid], [storeid], [value]) VALUES (N'3', N'1', N'D?o m?m')
INSERT [dbo].[product_attribute] ([product_attributeid], [storeid], [value]) VALUES (N'4', N'1', N'Nguyên cám')
INSERT [dbo].[product_attribute] ([product_attributeid], [storeid], [value]) VALUES (N'5', N'2', N'Giàu dinh du?ng')
INSERT [dbo].[product_attribute] ([product_attributeid], [storeid], [value]) VALUES (N'6', N'2', N'Ch?ng oxy hóa')
INSERT [dbo].[product_attribute] ([product_attributeid], [storeid], [value]) VALUES (N'7', N'2', N'D? b?o qu?n')
INSERT [dbo].[product_attribute] ([product_attributeid], [storeid], [value]) VALUES (N'8', N'2', N'N?u nhanh')
GO
INSERT [dbo].[role] ([code], [description], [roleid]) VALUES (N'ADMIN', N'Administrator role with all permissions', N'1')
INSERT [dbo].[role] ([code], [description], [roleid]) VALUES (N'STORE_OWNER', N'Store owner role with relevant permissions', N'2')
INSERT [dbo].[role] ([code], [description], [roleid]) VALUES (N'EMPLOYEE', N'Employee role with limited permissions', N'3')
GO
INSERT [dbo].[store] ([created_at], [expire_at], [accountid], [address], [description], [hotline], [image], [operating_hour], [store_name], [storeid], [subscription_planid]) VALUES (CAST(N'2025-01-20T20:40:12.6266670' AS DateTime2), NULL, N'2', N'123 Main Street', N'First store description', N'0123456789', N'image_store_one.jpg', N'8 AM - 8 PM', N'Store One', N'1', N'1')
INSERT [dbo].[store] ([created_at], [expire_at], [accountid], [address], [description], [hotline], [image], [operating_hour], [store_name], [storeid], [subscription_planid]) VALUES (CAST(N'2025-01-20T20:40:12.6266670' AS DateTime2), NULL, N'2', N'456 High Street', N'Second store description', N'0987654321', N'image_store_two.jpg', N'9 AM - 7 PM', N'Store Two', N'2', N'2')
INSERT [dbo].[store] ([created_at], [expire_at], [accountid], [address], [description], [hotline], [image], [operating_hour], [store_name], [storeid], [subscription_planid]) VALUES (CAST(N'2025-01-20T20:40:12.6266670' AS DateTime2), NULL, N'2', N'789 Elm Street', N'Third store description', N'0112233445', N'image_store_three.jpg', N'10 AM - 9 PM', N'Store Three', N'3', N'3')
GO
INSERT [dbo].[store_statistics] ([total_money], [type], [date], [description], [statisticsid], [storeid]) VALUES (1000.5, 1, CAST(N'2025-01-20T20:40:12.6300000' AS DateTime2), N'Export', N'1', N'1')
INSERT [dbo].[store_statistics] ([total_money], [type], [date], [description], [statisticsid], [storeid]) VALUES (2000.75, 1, CAST(N'2025-01-20T20:40:12.6300000' AS DateTime2), N'Export', N'2', N'2')
INSERT [dbo].[store_statistics] ([total_money], [type], [date], [description], [statisticsid], [storeid]) VALUES (-150, 1, CAST(N'2025-01-20T20:40:12.6300000' AS DateTime2), N'Export', N'3', N'1')
INSERT [dbo].[store_statistics] ([total_money], [type], [date], [description], [statisticsid], [storeid]) VALUES (3000, 0, CAST(N'2025-01-20T20:40:12.6300000' AS DateTime2), N'Import', N'4', N'2')
INSERT [dbo].[store_statistics] ([total_money], [type], [date], [description], [statisticsid], [storeid]) VALUES (-500, 0, CAST(N'2025-01-20T20:40:12.6300000' AS DateTime2), N'Import', N'5', N'1')
GO
INSERT [dbo].[subscription_plan] ([price], [description], [name], [subscription_planid], [time_of_expiration]) VALUES (29.99, N'Provides basic features for small businesses.', N'Basic Plan', N'1', NULL)
INSERT [dbo].[subscription_plan] ([price], [description], [name], [subscription_planid], [time_of_expiration]) VALUES (79.99, N'Includes additional tools for medium-sized businesses.', N'Standard Plan', N'2', NULL)
INSERT [dbo].[subscription_plan] ([price], [description], [name], [subscription_planid], [time_of_expiration]) VALUES (149.99, N'Full-featured package for large enterprises.', N'Premium Plan', N'3', NULL)
GO
INSERT [dbo].[zone] ([quantity], [size], [location], [name], [productid], [storeid], [zoneid]) VALUES (100, 50, N'Kho A1', N'Khu Ch?a G?o Jasmine 1', N'1', N'1', N'1')
INSERT [dbo].[zone] ([quantity], [size], [location], [name], [productid], [storeid], [zoneid]) VALUES (200, 72, N'Kho E2', N'Khu Ch?a G?o H?p Ð?c Bi?t', N'10', N'1', N'10')
INSERT [dbo].[zone] ([quantity], [size], [location], [name], [productid], [storeid], [zoneid]) VALUES (90, 30, N'Kho F1', N'Khu D? Tr? G?o Jasmine 1', N'1', N'1', N'11')
INSERT [dbo].[zone] ([quantity], [size], [location], [name], [productid], [storeid], [zoneid]) VALUES (220, 85, N'Kho F2', N'Khu D? Tr? G?o L?t Ð?', N'3', N'1', N'12')
INSERT [dbo].[zone] ([quantity], [size], [location], [name], [productid], [storeid], [zoneid]) VALUES (150, 60, N'Kho A2', N'Khu Ch?a G?o Jasmine 2', N'2', N'1', N'2')
INSERT [dbo].[zone] ([quantity], [size], [location], [name], [productid], [storeid], [zoneid]) VALUES (200, 70, N'Kho B1', N'Khu Ch?a G?o L?t Ð?', N'3', N'1', N'3')
INSERT [dbo].[zone] ([quantity], [size], [location], [name], [productid], [storeid], [zoneid]) VALUES (120, 55, N'Kho B2', N'Khu Ch?a G?o L?t Ðen', N'4', N'1', N'4')
INSERT [dbo].[zone] ([quantity], [size], [location], [name], [productid], [storeid], [zoneid]) VALUES (300, 90, N'Kho C1', N'Khu G?o Basmati ?n Ð?', N'5', N'2', N'5')
INSERT [dbo].[zone] ([quantity], [size], [location], [name], [productid], [storeid], [zoneid]) VALUES (250, 80, N'Kho C2', N'Khu G?o Basmati Cao C?p', N'6', N'2', N'6')
INSERT [dbo].[zone] ([quantity], [size], [location], [name], [productid], [storeid], [zoneid]) VALUES (220, 75, N'Kho D1', N'Khu N?p Truy?n Th?ng', N'7', N'2', N'7')
INSERT [dbo].[zone] ([quantity], [size], [location], [name], [productid], [storeid], [zoneid]) VALUES (180, 65, N'Kho D2', N'Khu N?p Thái Lo?i 1', N'8', N'2', N'8')
INSERT [dbo].[zone] ([quantity], [size], [location], [name], [productid], [storeid], [zoneid]) VALUES (160, 68, N'Kho E1', N'Khu Ch?a G?o H?p Lo?i 1', N'9', N'1', N'9')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UKg4b37bcdq6mmqdp3p67qoatc]    Script Date: 22/01/2025 12:04:53 SA ******/
ALTER TABLE [dbo].[account] ADD  CONSTRAINT [UKg4b37bcdq6mmqdp3p67qoatc] UNIQUE NONCLUSTERED 
(
	[phone_number] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UKgex1lmaqpg0ir5g1f5eftyaa1]    Script Date: 22/01/2025 12:04:53 SA ******/
ALTER TABLE [dbo].[account] ADD  CONSTRAINT [UKgex1lmaqpg0ir5g1f5eftyaa1] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UKa7ujv987la0i7a0o91ueevchc]    Script Date: 22/01/2025 12:04:53 SA ******/
ALTER TABLE [dbo].[permission] ADD  CONSTRAINT [UKa7ujv987la0i7a0o91ueevchc] UNIQUE NONCLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UKc36say97xydpmgigg38qv5l2p]    Script Date: 22/01/2025 12:04:53 SA ******/
ALTER TABLE [dbo].[role] ADD  CONSTRAINT [UKc36say97xydpmgigg38qv5l2p] UNIQUE NONCLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[account]  WITH CHECK ADD  CONSTRAINT [FK4uk2u5ju46nwjwvlwt1jol9ue] FOREIGN KEY([roleid])
REFERENCES [dbo].[role] ([roleid])
GO
ALTER TABLE [dbo].[account] CHECK CONSTRAINT [FK4uk2u5ju46nwjwvlwt1jol9ue]
GO
ALTER TABLE [dbo].[category]  WITH CHECK ADD  CONSTRAINT [FKcf9qbqq1d9h32us6t14vp7mo4] FOREIGN KEY([storeid])
REFERENCES [dbo].[store] ([storeid])
GO
ALTER TABLE [dbo].[category] CHECK CONSTRAINT [FKcf9qbqq1d9h32us6t14vp7mo4]
GO
ALTER TABLE [dbo].[customer]  WITH CHECK ADD  CONSTRAINT [FK8m1281q7q774hjp65fhuy3n22] FOREIGN KEY([storeid])
REFERENCES [dbo].[store] ([storeid])
GO
ALTER TABLE [dbo].[customer] CHECK CONSTRAINT [FK8m1281q7q774hjp65fhuy3n22]
GO
ALTER TABLE [dbo].[debt]  WITH CHECK ADD  CONSTRAINT [FK4op2c0esh9xtshpl7942j3c3i] FOREIGN KEY([customerid])
REFERENCES [dbo].[customer] ([customerid])
GO
ALTER TABLE [dbo].[debt] CHECK CONSTRAINT [FK4op2c0esh9xtshpl7942j3c3i]
GO
ALTER TABLE [dbo].[debt]  WITH CHECK ADD  CONSTRAINT [FKsevjcgvukr0a8igituqsf8a3d] FOREIGN KEY([storeid])
REFERENCES [dbo].[store] ([storeid])
GO
ALTER TABLE [dbo].[debt] CHECK CONSTRAINT [FKsevjcgvukr0a8igituqsf8a3d]
GO
ALTER TABLE [dbo].[employee]  WITH CHECK ADD  CONSTRAINT [FKg3xiduhj2dth5yrmbr05v9wq5] FOREIGN KEY([accountid])
REFERENCES [dbo].[account] ([accountid])
GO
ALTER TABLE [dbo].[employee] CHECK CONSTRAINT [FKg3xiduhj2dth5yrmbr05v9wq5]
GO
ALTER TABLE [dbo].[employee]  WITH CHECK ADD  CONSTRAINT [FKtgbqs6uc58uf9ybapljkdw3ft] FOREIGN KEY([storeid])
REFERENCES [dbo].[store] ([storeid])
GO
ALTER TABLE [dbo].[employee] CHECK CONSTRAINT [FKtgbqs6uc58uf9ybapljkdw3ft]
GO
ALTER TABLE [dbo].[has_attribute]  WITH CHECK ADD  CONSTRAINT [FK605uw074uurq4k6x2p4h7barm] FOREIGN KEY([productid])
REFERENCES [dbo].[product] ([productid])
GO
ALTER TABLE [dbo].[has_attribute] CHECK CONSTRAINT [FK605uw074uurq4k6x2p4h7barm]
GO
ALTER TABLE [dbo].[has_attribute]  WITH CHECK ADD  CONSTRAINT [FKpf1rdvgr2yuc4hltijw55l23y] FOREIGN KEY([product_attributeid])
REFERENCES [dbo].[product_attribute] ([product_attributeid])
GO
ALTER TABLE [dbo].[has_attribute] CHECK CONSTRAINT [FKpf1rdvgr2yuc4hltijw55l23y]
GO
ALTER TABLE [dbo].[has_permission]  WITH CHECK ADD  CONSTRAINT [FKb3pafabrpi5ff4y1o0cogmnow] FOREIGN KEY([permissionid])
REFERENCES [dbo].[permission] ([permissionid])
GO
ALTER TABLE [dbo].[has_permission] CHECK CONSTRAINT [FKb3pafabrpi5ff4y1o0cogmnow]
GO
ALTER TABLE [dbo].[has_permission]  WITH CHECK ADD  CONSTRAINT [FKlyjca9b6y9n3fjx9swhmw7y7m] FOREIGN KEY([roleid])
REFERENCES [dbo].[role] ([roleid])
GO
ALTER TABLE [dbo].[has_permission] CHECK CONSTRAINT [FKlyjca9b6y9n3fjx9swhmw7y7m]
GO
ALTER TABLE [dbo].[invoice]  WITH CHECK ADD  CONSTRAINT [FK1nm9kjwe1nxq698df4uak00d3] FOREIGN KEY([customerid])
REFERENCES [dbo].[customer] ([customerid])
GO
ALTER TABLE [dbo].[invoice] CHECK CONSTRAINT [FK1nm9kjwe1nxq698df4uak00d3]
GO
ALTER TABLE [dbo].[invoice]  WITH CHECK ADD  CONSTRAINT [FKbkxi7picpp52xuorrbfxd0mte] FOREIGN KEY([storeid])
REFERENCES [dbo].[store] ([storeid])
GO
ALTER TABLE [dbo].[invoice] CHECK CONSTRAINT [FKbkxi7picpp52xuorrbfxd0mte]
GO
ALTER TABLE [dbo].[invoice_detail]  WITH CHECK ADD  CONSTRAINT [FK7ojo6otg4msr2kudii06105bv] FOREIGN KEY([invoiceid])
REFERENCES [dbo].[invoice] ([invoiceid])
GO
ALTER TABLE [dbo].[invoice_detail] CHECK CONSTRAINT [FK7ojo6otg4msr2kudii06105bv]
GO
ALTER TABLE [dbo].[invoice_detail]  WITH CHECK ADD  CONSTRAINT [FKl0v7irg1a8aohmwe0fs9uixr3] FOREIGN KEY([productid])
REFERENCES [dbo].[product] ([productid])
GO
ALTER TABLE [dbo].[invoice_detail] CHECK CONSTRAINT [FKl0v7irg1a8aohmwe0fs9uixr3]
GO
ALTER TABLE [dbo].[notification]  WITH CHECK ADD  CONSTRAINT [FKdc4xic9fmcxekx3jxbnrkiut5] FOREIGN KEY([accountid])
REFERENCES [dbo].[account] ([accountid])
GO
ALTER TABLE [dbo].[notification] CHECK CONSTRAINT [FKdc4xic9fmcxekx3jxbnrkiut5]
GO
ALTER TABLE [dbo].[notification]  WITH CHECK ADD  CONSTRAINT [FKixhk0pjyyjrtru2q3i6ctj9vq] FOREIGN KEY([target_accountid])
REFERENCES [dbo].[account] ([accountid])
GO
ALTER TABLE [dbo].[notification] CHECK CONSTRAINT [FKixhk0pjyyjrtru2q3i6ctj9vq]
GO
ALTER TABLE [dbo].[product]  WITH CHECK ADD  CONSTRAINT [FK4ort9abhumpx4t2mlngljr1vi] FOREIGN KEY([categoryid])
REFERENCES [dbo].[category] ([categoryid])
GO
ALTER TABLE [dbo].[product] CHECK CONSTRAINT [FK4ort9abhumpx4t2mlngljr1vi]
GO
ALTER TABLE [dbo].[product]  WITH CHECK ADD  CONSTRAINT [FK9v9pxncccv2bwg4dgni5s9tbn] FOREIGN KEY([storeid])
REFERENCES [dbo].[store] ([storeid])
GO
ALTER TABLE [dbo].[product] CHECK CONSTRAINT [FK9v9pxncccv2bwg4dgni5s9tbn]
GO
ALTER TABLE [dbo].[product_attribute]  WITH CHECK ADD  CONSTRAINT [FKesfnhqgivclc4upitdxn30tiw] FOREIGN KEY([storeid])
REFERENCES [dbo].[store] ([storeid])
GO
ALTER TABLE [dbo].[product_attribute] CHECK CONSTRAINT [FKesfnhqgivclc4upitdxn30tiw]
GO
ALTER TABLE [dbo].[store]  WITH CHECK ADD  CONSTRAINT [FKpiqkxia18h2stdh63kvuo89f0] FOREIGN KEY([accountid])
REFERENCES [dbo].[account] ([accountid])
GO
ALTER TABLE [dbo].[store] CHECK CONSTRAINT [FKpiqkxia18h2stdh63kvuo89f0]
GO
ALTER TABLE [dbo].[store]  WITH CHECK ADD  CONSTRAINT [FKpyaahkfjbr7r911mnb8o9gqcl] FOREIGN KEY([subscription_planid])
REFERENCES [dbo].[subscription_plan] ([subscription_planid])
GO
ALTER TABLE [dbo].[store] CHECK CONSTRAINT [FKpyaahkfjbr7r911mnb8o9gqcl]
GO
ALTER TABLE [dbo].[store_statistics]  WITH CHECK ADD  CONSTRAINT [FKdf2knm48tgsur6tx9ena285ws] FOREIGN KEY([storeid])
REFERENCES [dbo].[store] ([storeid])
GO
ALTER TABLE [dbo].[store_statistics] CHECK CONSTRAINT [FKdf2knm48tgsur6tx9ena285ws]
GO
ALTER TABLE [dbo].[zone]  WITH CHECK ADD  CONSTRAINT [FKb19o6n8currj0n06ol84pm2ya] FOREIGN KEY([productid])
REFERENCES [dbo].[product] ([productid])
GO
ALTER TABLE [dbo].[zone] CHECK CONSTRAINT [FKb19o6n8currj0n06ol84pm2ya]
GO
ALTER TABLE [dbo].[zone]  WITH CHECK ADD  CONSTRAINT [FKfi0sy2c65pl1dpt9b1s8e6a7d] FOREIGN KEY([storeid])
REFERENCES [dbo].[store] ([storeid])
GO
ALTER TABLE [dbo].[zone] CHECK CONSTRAINT [FKfi0sy2c65pl1dpt9b1s8e6a7d]
GO
