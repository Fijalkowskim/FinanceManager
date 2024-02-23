package com.fijalkowskim.financemanager.dao;

import com.fijalkowskim.financemanager.models.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
 Page<Expense> findAllByOrderByDateDesc(Pageable pageable);
 Page<Expense> findAllByOrderByDateAsc(Pageable pageable);
    Page<Expense> findAllByDateBetweenOrderByDateDesc(LocalDateTime start, LocalDateTime end, Pageable pageable);
}
