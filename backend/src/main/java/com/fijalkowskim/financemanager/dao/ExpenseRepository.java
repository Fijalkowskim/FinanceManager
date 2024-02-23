package com.fijalkowskim.financemanager.dao;

import com.fijalkowskim.financemanager.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
