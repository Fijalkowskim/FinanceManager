package com.fijalkowskim.financemanager.services;

import com.fijalkowskim.financemanager.dao.PlannedExpenseRepository;
import com.fijalkowskim.financemanager.models.Expense;
import com.fijalkowskim.financemanager.models.PlannedExpense;
import com.fijalkowskim.financemanager.requestmodels.ExpenseRequest;
import com.fijalkowskim.financemanager.requestmodels.PlannedExpenseRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
public class PlannedExpenseService {
    private PlannedExpenseRepository plannedExpenseRepository;

    @Autowired
    public PlannedExpenseService(PlannedExpenseRepository plannedExpenseRepository) {
        this.plannedExpenseRepository = plannedExpenseRepository;
    }
    public Page<PlannedExpense> getExpenses(PageRequest pageRequest, String sortCost, String sortDate) throws RuntimeException{
        if(sortCost != null){
            if(sortCost.equals("asc")) return plannedExpenseRepository.findAllByOrderByCostAsc(pageRequest);
            else if (sortCost.equals("desc")) return plannedExpenseRepository.findAllByOrderByCostDesc(pageRequest);
            throw new RuntimeException("Bad cost sorting parameter.");
        }
        else if(sortDate.equals("desc")) return plannedExpenseRepository.findAllByOrderByDateDesc(pageRequest);
        else if(sortDate.equals("asc")) return plannedExpenseRepository.findAllByOrderByDateAsc(pageRequest);
        else throw new RuntimeException("Bad date sorting parameter.");
    }
    public Page<PlannedExpense> getExpensesForCategory(PageRequest pageRequest,String category, String sortCost, String sortDate) throws RuntimeException{
        if(sortCost != null){
            if(sortCost.equals("asc")) return plannedExpenseRepository.findAllByCategoryOrderByCostAsc(category,pageRequest);
            else if (sortCost.equals("desc")) return plannedExpenseRepository.findAllByCategoryOrderByCostDesc(category,pageRequest);
            throw new RuntimeException("Bad cost sorting parameter.");
        }
        else if(sortDate.equals("desc")) return plannedExpenseRepository.findAllByCategoryOrderByDateDesc(category,pageRequest);
        else if(sortDate.equals("asc")) return plannedExpenseRepository.findAllByCategoryOrderByDateAsc(category,pageRequest);
        else throw new RuntimeException("Bad date sorting parameter.");
    }
    public PlannedExpense getExpense(Long id) throws Exception {
        Optional<PlannedExpense> expense = plannedExpenseRepository.findById(id);
        if(expense.isEmpty()){
            throw new Exception("Expense not found");
        }
        return expense.get();
    }
    public PlannedExpense addExpense(PlannedExpenseRequest expenseRequest) {
        PlannedExpense expense = new PlannedExpense();
        expense.setCategory(expenseRequest.getCategory());
        expense.setCost(expenseRequest.getCost());
        expense.setDate(expenseRequest.getDate());
        expenseRequest.getDescription().ifPresent(expense::setDescription);
        return plannedExpenseRepository.save(expense);
    }
    public void deleteExpense (Long id)throws Exception{
        Optional<PlannedExpense> expense = plannedExpenseRepository.findById(id);
        if(expense.isEmpty()){
            throw new Exception("Expense not found");
        }
        plannedExpenseRepository.delete(expense.get());
    }
    public PlannedExpense updateExpense(Long id, PlannedExpenseRequest expenseRequest)throws Exception{
        Optional<PlannedExpense> oldExpense = plannedExpenseRepository.findById(id);
        if(oldExpense.isEmpty()){
            throw new Exception("Expense not found");
        }
        PlannedExpense expense = new PlannedExpense();
        expense.setId(oldExpense.get().getId());
        expense.setDate(oldExpense.get().getDate());
        expense.setCategory(expenseRequest.getCategory());
        expense.setCost(expenseRequest.getCost());
        expenseRequest.getDescription().ifPresent(expense::setDescription);
        return plannedExpenseRepository.save(expense);
    }
}
