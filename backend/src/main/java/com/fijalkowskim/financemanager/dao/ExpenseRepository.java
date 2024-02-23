package com.fijalkowskim.financemanager.dao;

import com.fijalkowskim.financemanager.models.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Page<Expense> findAllByOrderByDateDesc(Pageable pageable);
    Page<Expense> findAllByOrderByDateAsc(Pageable pageable);
    Page<Expense> findAllByDateBetweenOrderByDateDesc(LocalDateTime start, LocalDateTime end, Pageable pageable);
    @Query("SELECT SUM(e.cost) FROM Expense e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month")
    Double calculateTotalSpendingForMonth(@Param("year") int year, @Param("month") int month);

    @Query("SELECT e.category FROM Expense e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month GROUP BY e.category ORDER BY SUM(e.cost) DESC LIMIT 1")
    String findTopCategoryForMonth(@Param("year") int year, @Param("month") int month);

    @Query("SELECT e FROM Expense e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month ORDER BY e.cost DESC LIMIT 1")
    Expense findTopExpenseForMonth(@Param("year") int year, @Param("month") int month);

    @Query("SELECT e.category, SUM(e.cost) FROM Expense e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month GROUP BY e.category")
    List<Object[]> calculateCostsPerCategoryForMonth(@Param("year") int year, @Param("month") int month);
}
