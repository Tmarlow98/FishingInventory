IF NOT EXISTS(SELECT * FROM sys.Databases 
WHERE name = 'FishingInventory')
CREATE DATABASE FishingInventory;
BEGIN

USE FishingInventory;

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_NAME = 'hooks')
CREATE TABLE dbo.hooks (
    id INT IDENTITY(1,1) PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    size VARCHAR(5) NOT NULL,
    hook_type VARCHAR(50) NOT NULL
);

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'soft_plastics')
CREATE TABLE dbo.soft_plastics(
    id INT IDENTITY(1,1) PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    size VARCHAR(5) NOT NULL,
    sp_type VARCHAR(30) NOT NULL
);

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'reels')
CREATE TABLE dbo.reels(
    id INT IDENTITY(1,1) PRIMARY KEY,
    company VARCHAR(50) NOT NULL,
    size INT NOT NULL
);

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'line')
CREATE TABLE dbo.line(
    id INT IDENTITY(1,1) PRIMARY KEY,
    company  VARCHAR(50) NOT NULL,
    ib_test INT NOT NULL
);

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'rods')
CREATE TABLE dbo.rods(
    id INT IDENTITY(1,1) PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    rod_length VARCHAR(50) NOT NULL,
    feet INT NOT NULL,
    inches INT NOT NULL,
    reel_id INT NOT NULL,
    line_id INT NOT NULL,
    FOREIGN KEY(reel_id) REFERENCES dbo.reels(id),
    FOREIGN KEY(line_id) REFERENCES dbo.line(id)
);

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'person')
CREATE TABLE dbo.person(
    id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    hooks_id INT NOT NULL,
    sp_id INT NOT NULL,
    rods_id INT NOT NULL,
    num_hooks INT NOT NULL,
    FOREIGN KEY(hooks_id) REFERENCES dbo.hooks(id),
    FOREIGN KEY(sp_id) REFERENCES dbo.soft_plastics(id),
    FOREIGN KEY(rods_id) REFERENCES dbo.rods(id)
);

SELECT * FROM INFORMATION_SCHEMA.TABLES;
END
