CREATE DATABASE IF NOT EXISTS finance_manager;
USE finance_manager;

DROP TABLE IF EXISTS expenses ;
CREATE TABLE expenses (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          cost FLOAT NOT NULL,
                          category VARCHAR(255) NOT NULL,
                          description VARCHAR(255),
                          date DATETIME NOT NULL
);

-- 2022
INSERT INTO expenses (cost, category, description, date)
VALUES
    (50.25, 'Groceries', 'Monthly grocery shopping', '2022-02-15'),
    (30.00, 'Utilities', 'Electricity bill', '2022-03-10'),
    (20.50, 'Transportation', 'Gas for the car', '2022-04-05'),
    (80.00, 'Healthcare', 'Doctor appointment', '2022-05-20'),
    (15.99, 'Entertainment', 'Movie night', '2022-06-08'),
    (45.50, 'Clothing', 'New pair of shoes', '2022-07-15'),
    (200.00, 'Travel', 'Weekend getaway', '2022-08-22'),
    (10.00, 'Other', 'Miscellaneous expense', '2022-09-12');

-- 2023
INSERT INTO expenses (cost, category, description, date)
VALUES
    (55.50, 'Groceries', 'Weekly grocery shopping', '2023-01-05'),
    (35.00, 'Utilities', 'Water bill', '2023-02-18'),
    (25.75, 'Transportation', 'Public transportation pass', '2023-03-25'),
    (90.00, 'Healthcare', 'Dental checkup', '2023-04-12'),
    (18.99, 'Entertainment', 'Concert tickets', '2023-05-30'),
    (50.20, 'Clothing', 'Summer wardrobe update', '2023-06-15'),
    (250.00, 'Travel', 'Vacation expenses', '2023-08-10'),
    (12.50, 'Other', 'Unexpected expense', '2023-09-28');

-- 2024
INSERT INTO expenses (cost, category, description, date)
VALUES
    (60.75, 'Groceries', 'Special occasion grocery shopping', '2024-01-14'),
    (40.00, 'Utilities', 'Internet bill', '2024-01-08'),
    (30.25, 'Transportation', 'Car maintenance', '2024-02-20'),
    (100.00, 'Healthcare', 'Prescription medications', '2024-02-05'),
    (25.99, 'Entertainment', 'Streaming service subscription', '2024-01-12'),
    (55.00, 'Clothing', 'Winter clothing purchase', '2024-01-02'),
    (300.00, 'Travel', 'International trip expenses', '2024-01-18'),
    (15.50, 'Other', 'Gift for a friend', '2024-01-30');

-- 02.2024
INSERT INTO expenses (cost, category, description, date)
VALUES
    (40.50, 'Groceries', 'Weekly grocery shopping', '2024-02-05'),
    (25.00, 'Utilities', 'Gas bill', '2024-02-10'),
    (15.75, 'Transportation', 'Bus tickets', '2024-02-15'),
    (60.00, 'Healthcare', 'Pharmacy expenses', '2024-02-20'),
    (12.99, 'Entertainment', 'Book purchase', '2024-02-08'),
    (35.20, 'Clothing', 'New shirt', '2024-02-18'),
    (120.00, 'Travel', 'Planning a future trip', '2024-02-22'),
    (8.50, 'Other', 'Coffee with friends', '2024-02-12');