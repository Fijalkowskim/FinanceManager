package com.fijalkowskim.financemanager.services;

import com.fijalkowskim.financemanager.dao.ExpenseRepository;
import com.fijalkowskim.financemanager.models.Expense;
import com.fijalkowskim.financemanager.requestmodels.ExpenseRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class ExpenseService {
    private ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
     public Page<Expense> getExpenses(PageRequest pageRequest){
        return expenseRepository.findAll(pageRequest);
    }
    public Expense getExpense(Long id) throws Exception {
        Optional<Expense> expense = expenseRepository.findById(id);
        if(expense.isEmpty()){
            throw new Exception("Expense not found");
        }
        return expense.get();
    }
    public Expense addExpense(ExpenseRequest expenseRequest) {
        Expense expense = new Expense();
        expense.setCategory(expenseRequest.getCategory());
        expense.setCost(expenseRequest.getCost());
        expense.setDate(LocalDateTime.now());
        expenseRequest.getDescription().ifPresent(expense::setDescription);
        return expenseRepository.save(expense);
    }
    public void deleteExpense (Long id)throws Exception{
        Optional<Expense> expense = expenseRepository.findById(id);
        if(expense.isEmpty()){
            throw new Exception("Expense not found");
        }
        expenseRepository.delete(expense.get());
    }
    public Expense updateExpense(Long id, ExpenseRequest expenseRequest)throws Exception{
        Optional<Expense> oldExpense = expenseRepository.findById(id);
        if(oldExpense.isEmpty()){
            throw new Exception("Expense not found");
        }
        Expense expense = new Expense();
        expense.setId(oldExpense.get().getId());
        expense.setDate(oldExpense.get().getDate());
        expense.setCategory(expenseRequest.getCategory());
        expense.setCost(expenseRequest.getCost());
        expenseRequest.getDescription().ifPresent(expense::setDescription);
        return expenseRepository.save(expense);
    }
}
