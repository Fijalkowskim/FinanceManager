package com.fijalkowskim.financemanager.dao;

import com.fijalkowskim.financemanager.models.expences.PlannedExpense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PlannedExpenseRepository extends JpaRepository<PlannedExpense, Long> {
    Page<PlannedExpense> findAllByOrderByDateDesc(Pageable pageable);
    Page<PlannedExpense> findAllByOrderByDateAsc(Pageable pageable);
    Page<PlannedExpense> findAllByOrderByCostDesc(Pageable pageable);
    Page<PlannedExpense> findAllByOrderByCostAsc(Pageable pageable);
    Page<PlannedExpense> findAllByCategoryOrderByDateDesc(String category,Pageable pageable);
    Page<PlannedExpense> findAllByCategoryOrderByDateAsc(String category,Pageable pageable);
    Page<PlannedExpense> findAllByCategoryOrderByCostDesc(String category,Pageable pageable);
    Page<PlannedExpense> findAllByCategoryOrderByCostAsc(String category,Pageable pageable);
    List<PlannedExpense> findAllByDateBetweenOrderByDateDesc(LocalDateTime start, LocalDateTime end, Pageable pageable);
    List<PlannedExpense> findAllByDateBeforeOrderByDateAsc(LocalDateTime dateTime);
}
