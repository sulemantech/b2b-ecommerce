-- Table structure for table `attributevaluetype`
CREATE TABLE IF NOT EXISTS attributevaluetype (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

-- Insert sample data for table `attributevaluetype`
INSERT INTO attributevaluetype (Name) VALUES
    ('Sample Attribute Type 1'),
    ('Sample Attribute Type 2'),
    -- Add other rows...

-- Table structure for table `category`
CREATE TABLE IF NOT EXISTS category (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    ParentCategoryId INT,
    FOREIGN KEY (ParentCategoryId) REFERENCES category (Id)
);

-- Insert sample data for table `category`
INSERT INTO category (Name, ParentCategoryId) VALUES
    ('Category 1', NULL),
    ('Category 2', NULL),
    -- Add other rows...

-- Table structure for table `contact`
CREATE TABLE IF NOT EXISTS contact (
    Id SERIAL PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL
);

-- Insert sample data for table `contact`
INSERT INTO contact (FirstName, LastName, Email) VALUES
    ('John', 'Doe', 'john.doe@example.com'),
    ('Jane', 'Doe', 'jane.doe@example.com'),
    -- Add other rows...

-- Table structure for table `address`
CREATE TABLE IF NOT EXISTS address (
    Id SERIAL PRIMARY KEY,
    Street VARCHAR(255) NOT NULL,
    City VARCHAR(255) NOT NULL,
    StateId INT,
    CountryId INT,
    ZipCode VARCHAR(20),
    FOREIGN KEY (StateId) REFERENCES state (Id),
    FOREIGN KEY (CountryId) REFERENCES country (Id)
);

-- Insert sample data for table `address`
INSERT INTO address (Street, City, StateId, CountryId, ZipCode) VALUES
    ('123 Main St', 'Cityville', 1, 1, '12345'),
    ('456 Oak St', 'Townsburg', 2, 2, '67890'),
    -- Add other rows...

-- Table structure for table `country`
CREATE TABLE IF NOT EXISTS country (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    IsoCode VARCHAR(10) NOT NULL
);

-- Insert sample data for table `country`
INSERT INTO country (Name, IsoCode) VALUES
    ('Country A', 'A'),
    ('Country B', 'B'),
    -- Add other rows...

-- Table structure for table `order`
CREATE TABLE IF NOT EXISTS "order" (
    Id SERIAL PRIMARY KEY,
    OrderDate TIMESTAMP,
    ShipDate TIMESTAMP,
    OrderStatus SMALLINT,
    CustomerId INT NOT NULL,
    ShipToAddressId INT,
    BillToAddressId INT,
    OrderTotal NUMERIC(10, 0),
    OrderTotalTax NUMERIC(10, 0),
    OrderTotalDiscount NUMERIC(10, 0),
    OrderTotalWithTax NUMERIC(10, 0),
    OrderTotalWithoutTax NUMERIC(10, 0),
    FOREIGN KEY (CustomerId) REFERENCES contact (Id),
    FOREIGN KEY (ShipToAddressId) REFERENCES address (Id),
    FOREIGN KEY (BillToAddressId) REFERENCES address (Id)
);

-- Insert sample data for table `order`
INSERT INTO "order" (OrderDate, ShipDate, OrderStatus, CustomerId, ShipToAddressId, BillToAddressId, OrderTotal, OrderTotalTax, OrderTotalDiscount, OrderTotalWithTax, OrderTotalWithoutTax) VALUES
    ('2023-01-01', '2023-01-05', 1, 1, 1, 2, 300, 10, 20, 330, 280),
    -- Add other rows...

-- Table structure for table `orderline`
CREATE TABLE IF NOT EXISTS orderline (
    Id SERIAL PRIMARY KEY,
    Price NUMERIC(10, 0) NOT NULL,
    Quantity INT NOT NULL,
    Discount NUMERIC(10, 0),
    Tax NUMERIC(10, 0),
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    CustomerId INT NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES "order" (Id),
    FOREIGN KEY (ProductId) REFERENCES product (Id),
    FOREIGN KEY (CustomerId) REFERENCES contact (Id)
);

-- Insert sample data for table `orderline`
INSERT INTO orderline (Price, Quantity, Discount, Tax, OrderId, ProductId, CustomerId) VALUES
    (100, 2, 5, 8, 1, 1, 1),
    -- Add other rows...

-- Table structure for table `payment`
CREATE TABLE IF NOT EXISTS payment (
    Id SERIAL PRIMARY KEY,
    Amount NUMERIC(10, 0) NOT NULL,
    PaymentDate TIMESTAMP,
    PaymentMethod SMALLINT,
    Status SMALLINT,
    OrderId INT NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES "order" (Id)
);

-- Insert sample data for table `payment`
INSERT INTO payment (Amount, PaymentDate, PaymentMethod, Status, OrderId) VALUES
    (300, '2023-01-10', 1, 1, 1),
    -- Add other rows...

-- Table structure for table `photo`
CREATE TABLE IF NOT EXISTS photo (
    Id SERIAL PRIMARY KEY,
    Photo TEXT NOT NULL DEFAULT '0'
);

-- Insert sample data for table `photo`
INSERT INTO photo (Photo) VALUES
    ('Sample Photo 1'),
    ('Sample Photo 2'),
    -- Add other rows...

-- Table structure for table `product`
CREATE TABLE IF NOT EXISTS product (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(300) NOT NULL,
    Description VARCHAR(500),
    Model VARCHAR(500),
    CategoryId INT NOT NULL,
    Display BOOLEAN NOT NULL DEFAULT TRUE,
    MemberId INT,
    UniFromFob BOOLEAN NOT NULL DEFAULT TRUE,
    Detail TEXT,
    Keywords VARCHAR(300),
    FOREIGN KEY (CategoryId) REFERENCES category (Id)
);

-- Insert sample data for table `product`
INSERT INTO product (Name, Description, Model, CategoryId, Display, MemberId, UniFromFob, Detail, Keywords) VALUES
    ('Product 1', 'Description 1', 'Model 1', 1, TRUE, 1, TRUE, 'Detail 1', 'Keyword 1'),
    ('Product 2', 'Description 2', 'Model 2', 2, TRUE, 2, TRUE, 'Detail 2', 'Keyword 2'),
    -- Add other rows...

-- Table structure for table `productattribute`
CREATE TABLE IF NOT EXISTS productattribute (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(300) NOT NULL,
    AttributeValueTypeId INT NOT NULL,
    ValueSet VARCHAR(500),
    CategoryId INT NOT NULL,
    FOREIGN KEY (AttributeValueTypeId) REFERENCES attributevaluetype (Id),
    FOREIGN KEY (CategoryId) REFERENCES category (Id)
);

-- Insert sample data for table `productattribute`
INSERT INTO productattribute (Name, AttributeValueTypeId, ValueSet, CategoryId) VALUES
    ('Attribute 1', 1, 'Value 1', 1),
    ('Attribute 2', 2, 'Value 2', 2),
    -- Add other rows...

-- Table structure for table `productphoto`
CREATE TABLE IF NOT EXISTS productphoto (
    Id SERIAL PRIMARY KEY,
    PhotoId INT NOT NULL,
    ProductId INT NOT NULL,
    FOREIGN KEY (PhotoId) REFERENCES photo (Id),
    FOREIGN KEY (ProductId) REFERENCES product (Id)
);

-- Insert sample data for table `productphoto`
INSERT INTO productphoto (PhotoId, ProductId) VALUES
    (1, 1),
    (2, 2),
    -- Add other rows...

-- Table structure for table `state`
CREATE TABLE IF NOT EXISTS state (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    CountryId INT,
    FOREIGN KEY (CountryId) REFERENCES country (Id)
);

-- Insert sample data for table `state`
INSERT INTO state (Name, CountryId) VALUES
    ('State 1', 1),
    ('State 2', 2),
    -- Add other rows...
