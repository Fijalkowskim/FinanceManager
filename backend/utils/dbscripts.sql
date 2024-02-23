CREATE DATABASE IF NOT EXISTS finance_manager;
USE finance_manager;

DROP TABLE IF EXISTS expenses ;
CREATE TABLE expenses (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          cost BIGINT NOT NULL,
                          category VARCHAR(255) NOT NULL,
                          description VARCHAR(255),
                          date DATETIME NOT NULL
);