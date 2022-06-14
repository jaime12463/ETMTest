-- Table: android_metadata
CREATE TABLE android_metadata ( locale TEXT );

CREATE TABLE [t_i_Customers] ( 
	[Code]           NVARCHAR( 16 )  NOT NULL,
    [Type]           NVARCHAR( 2 )   NOT NULL,
    [Name]           NVARCHAR( 64 )  NOT NULL,
    [CommercialName] NVARCHAR( 64 )  NOT NULL,
	[_created]		INT DEFAULT (0) NOT NULL,
	[_modified]		INT DEFAULT (0) NOT NULL,
	[_deleted]		BIT DEFAULT (0) NOT NULL,
	PRIMARY KEY (Code)  
);

CREATE TABLE [t_i_VisitPlans] (
    [Code] INT NOT NULL,
    [CustomerCode] NVARCHAR( 16 ) NOT NULL,
    [Day] DATE NOT NULL,
    [Sequence] INT NOT NULL,
	[_created] INT DEFAULT (0) NOT NULL,
	[_modified] INT DEFAULT (0) NOT NULL,
	[_deleted] INT DEFAULT (0) NOT NULL,
	PRIMARY KEY (Code) 
);

CREATE TABLE t_i_IniciativesEnabled ( 
    [Code]          INT NOT NULL,
    [CustomerCode] NVARCHAR( 16 ) NOT NULL,
	[Secuence]		INT,
    [_created]      INT,
    [_modified]     INT,
    [_deleted]      BIT,
    PRIMARY KEY ( Code ) 
);

CREATE TABLE t_io_BonusesEnabled (
	[Code] INT NOT NULL,
	[CustomerCode] NVARCHAR( 16 ) NOT NULL,
	[UserCode] NVARCHAR(10) NOT NULL,
	[GroupCode] NVARCHAR(4) NOT NULL,
	[OrderCode] BIGINT NOT NULL,
	[Bonus] INT NOT NULL,
	[ProductCode] INT NOT NULL,
	[Quantity] INT NOT NULL,
	[SizeUnit] NVARCHAR(3) NOT NULL,
	[CreationDate] DATETIME NOT NULL,
	[DeliveryDate] DATETIME NOT NULL,
	[_created] INT DEFAULT (0) NOT NULL,
	[_modified] INT DEFAULT (0) NOT NULL,
	[_deleted] INT DEFAULT (0) NOT NULL,
	PRIMARY KEY ( Code, CustomerCode, UserCode, GroupCode, OrderCode ) 
);

CREATE TABLE t_i_Coverages (
	[CustomerCode] NVARCHAR( 16 ) NOT NULL,
	[GroupCode] NVARCHAR(4) NOT NULL,
	[SequenceGroupCode] NVARCHAR(4) NOT NULL,
	[ProductGroupCode] INT NOT NULL,
	[isDone] BIT NOT NULL,
	[_created]		INT DEFAULT (0) NOT NULL,
	[_modified]		INT DEFAULT (0) NOT NULL,
	[_deleted]		BIT DEFAULT (0) NOT NULL,
	PRIMARY KEY ( CustomerCode, GroupCode, SequenceGroupCode, ProductGroupCode  )
);

CREATE TABLE t_i_CreditInformations (
	[CustomerCode] NVARCHAR( 16 ) NOT NULL,
	[DocumentNumber] NVARCHAR(30) NOT NULL,
	[CreditCondition] INT NOT NULL,
	[CreditLimit]            DOUBLE,
    [Balance]                DOUBLE,
	[isCreditBlocked]        BIT NOT NULL,
	[isSaleBlocked]          BIT NOT NULL,
	[enabledFinancialCharge] BIT NOT NULL,
	[daysAlertDueFrom]  INT NOT NULL,
	[daysAlertDueTo]  INT NOT NULL,
	[DocumentExpirationDate] DATETIME NOT NULL,
	[DocumentDate] DATETIME NOT NULL,
	[DocumentoAmount] DOUBLE,
	[_created]		INT DEFAULT (0) NOT NULL,
	[_modified]		INT DEFAULT (0) NOT NULL,
	[_deleted]		BIT DEFAULT (0) NOT NULL,
	PRIMARY KEY ( CustomerCode, DocumentNumber )
);

CREATE TABLE t_i_CustomerOrderConfigurations (
	[CustomerCode] NVARCHAR( 16 ) NOT NULL,
	[exchangeEnabled] BIT NOT NULL,
	[amountMinimumSale] DOUBLE,
	[deliveryDate] DATETIME NOT NULL,
	[isComplete] BIT NOT NULL,
	[maximumCashSaleAmount] DOUBLE,
	[consumed] DOUBLE,
	[maximumQuantityUnits] INT NOT NULL,
	[_created]		INT DEFAULT (0) NOT NULL,
	[_modified]		INT DEFAULT (0) NOT NULL,
	[_deleted]		BIT DEFAULT (0) NOT NULL,
	PRIMARY KEY ( CustomerCode )
);

CREATE TABLE t_i_PromotionsEnabled (
	[code] INT NOT NULL,
	[customerCode] NVARCHAR( 16 ) NOT NULL,
	[availablePromotions] INT NOT NULL,
	PRIMARY KEY ( code, CustomerCode )
);

CREATE TABLE t_i_portfolio (
	[customerCode] NVARCHAR( 16 ) NOT NULL,
	[productCode] INT NOT NULL,
	[isSubUnitSales] BIT DEFAULT (0) NOT NULL,
	[availableUnits]INT NOT NULL,
	[priceWithUnitTax] DOUBLE,
	[priceWithUnitSubunit] DOUBLE,
	[priceWithOutUnitTax] DOUBLE,
	[priceWithOutUnitSubunit] DOUBLE,
	[validityStartPrice] DATETIME NOT NULL,
	[validityEndPrice] DATETIME NOT NULL,
	[_created]		INT DEFAULT (0) NOT NULL,
	[_modified]		INT DEFAULT (0) NOT NULL,
	[_deleted]		BIT DEFAULT (0) NOT NULL,
	PRIMARY KEY ( CustomerCode, productCode )
);

CREATE TABLE t_i_Products (
	[Code] INT NOT NULL,
    [Description] NVARCHAR(32) NOT NULL,
    [ShortDescription] NVARCHAR(16) NOT NULL,
	[Presentation] INT NULL,
	[MinimumQuantitySale] INT NULL,
	[ProductType] NVARCHAR(4) NOT NULL,
	[Implicit1] INT NULL,
    [Implicit2] INT NULL,
    [ProductTasteCode] CHAR(10) NULL,
    [ProductFamilyCode] CHAR(10) NULL,
	[ProductBrandCode] CHAR(10) NULL,
	[ProductPackagingCode] CHAR(10) NULL,
	[ProductSizeCode] CHAR(10) NULL,
	PRIMARY KEY (
		[Code]
	) 
);

CREATE TABLE t_i_PromosPush (
	[Code] INT NOT NULL,
	[ProductCode] INT NOT NULL,
	[Quantity] INT NOT NULL,
	[measureUnit] NVARCHAR(3) NOT NULL,
	PRIMARY KEY (Code, ProductCode) 
)

CREATE TABLE t_i_BudgetsTypeOrders (
	[code] INT NOT NULL,
	[orderType] NVARCHAR(10) NOT NULL,
	[validityStartBudget] DATETIME NOT NULL,
	[validityEndBudget] DATETIME NOT NULL,
	[isEnabledProducts] BIT DEFAULT (0) NOT NULL,
	[ProductsCodeEnabled] BIT DEFAULT (0) NOT NULL,
	[_created]		INT DEFAULT (0) NOT NULL,
	[_modified]		INT DEFAULT (0) NOT NULL,
	[_deleted]		BIT DEFAULT (0) NOT NULL,
	PRIMARY KEY ( Code ) 
);

CREATE TABLE t_i_Bonuses (
	[Code] INT NOT NULL,
	[Description] NVARCHAR(32) NOT NULL,
	[validityStartBonus] DATETIME NOT NULL,
	[validityEndBonus] DATETIME NOT NULL,
	[applicationBonus] NVARCHAR(10) NOT NULL,
	[bonusGroupCode] INT NOT NULL,
	PRIMARY KEY ( Code )
);

CREATE TABLE t_i_BonusGroups (
	[Code] INT NOT NULL,
	[Description] NVARCHAR(32) NOT NULL,
	[profitGroupQuantity] INT NOT NULL,
	[unitMeasure] CHAR(10) NOT NULL,
	[productGroupProfit] INT NOT NULL,
	PRIMARY KEY ( Code )
);

CREATE TABLE t_i_Taste (
	[Code] INT NOT NULL,
	[Description] NVARCHAR(32) NOT NULL,
	[_created]		INT DEFAULT (0) NOT NULL,
	[_modified]		INT DEFAULT (0) NOT NULL,
	[_deleted]		BIT DEFAULT (0) NOT NULL,
	PRIMARY KEY ( Code )
);

CREATE TABLE t_i_Family (
	[Code] INT NOT NULL,
	[Description] NVARCHAR(32) NOT NULL,
	[_created]		INT DEFAULT (0) NOT NULL,
	[_modified]		INT DEFAULT (0) NOT NULL,
	[_deleted]		BIT DEFAULT (0) NOT NULL,
	PRIMARY KEY ( Code )
)

CREATE TABLE t_i_Measures (
	[Code] INT NOT NULL,
	[Description] NVARCHAR(32) NOT NULL,
	[_created]		INT DEFAULT (0) NOT NULL,
	[_modified]		INT DEFAULT (0) NOT NULL,
	[_deleted]		BIT DEFAULT (0) NOT NULL,
	PRIMARY KEY ( Code )
)

CREATE TABLE t_i_Brands (
	[Code] INT NOT NULL,
	[Description] NVARCHAR(32) NOT NULL,
	[_created]		INT DEFAULT (0) NOT NULL,
	[_modified]		INT DEFAULT (0) NOT NULL,
	[_deleted]		BIT DEFAULT (0) NOT NULL,
	PRIMARY KEY ( Code )
)

CREATE TABLE t_i_Packages (
	[Code] INT NOT NULL,
	[Description] NVARCHAR(32) NOT NULL,
	[_created]		INT DEFAULT (0) NOT NULL,
	[_modified]		INT DEFAULT (0) NOT NULL,
	[_deleted]		BIT DEFAULT (0) NOT NULL,
	PRIMARY KEY ( Code )
)


 