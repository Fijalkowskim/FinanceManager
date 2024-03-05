package com.fijalkowskim.financemanager.services;

import com.fijalkowskim.financemanager.dao.ExpenseRepository;
import com.fijalkowskim.financemanager.dao.PlannedExpenseRepository;
import com.fijalkowskim.financemanager.models.expences.Expense;
import com.fijalkowskim.financemanager.models.expences.PlannedExpense;
import com.fijalkowskim.financemanager.models.dashboards.PlannedExpensesDashboard;
import com.fijalkowskim.financemanager.requestmodels.PlannedExpenseRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
@Transactional
public class PlannedExpenseService {
    private final PlannedExpenseRepository plannedExpenseRepository;
    private final ExpenseRepository expenseRepository;

    @Autowired
    public PlannedExpenseService(PlannedExpenseRepository plannedExpenseRepository, ExpenseRepository expenseRepository) {
        this.plannedExpenseRepository = plannedExpenseRepository;
        this.expenseRepository = expenseRepository;
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
        expense.setDate(expenseRequest.getDate().withHour(LocalDateTime.now().getHour()).withMinute(LocalDateTime.now().getMinute()).withSecond(LocalDateTime.now().getSecond()));
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
    public Expense payExpense(Long id)throws Exception{
        Optional<PlannedExpense> expense = plannedExpenseRepository.findById(id);
        if(expense.isEmpty()){
            throw new Exception("Expense not found");
        }
        Expense newExpense = new Expense();
        newExpense.setDate(expense.get().getDate());
        newExpense.setDescription(expense.get().getDescription());
        newExpense.setCost(expense.get().getCost());
        newExpense.setCategory(expense.get().getCategory());
        plannedExpenseRepository.delete(expense.get());
        return expenseRepository.save(newExpense);
    }
    public PlannedExpense updateExpense(Long id, PlannedExpenseRequest expenseRequest)throws Exception{
        Optional<PlannedExpense> oldExpense = plannedExpenseRepository.findById(id);
        if(oldExpense.isEmpty()){
            throw new Exception("Expense not found");
        }
        PlannedExpense expense = new PlannedExpense();
        expense.setId(oldExpense.get().getId());
        expense.setDate(expenseRequest.getDate().withHour(LocalDateTime.now().getHour()).withMinute(LocalDateTime.now().getMinute()).withSecond(LocalDateTime.now().getSecond()));
        expense.setCategory(expenseRequest.getCategory());
        expense.setCost(expenseRequest.getCost());
        expenseRequest.getDescription().ifPresent(expense::setDescription);
        return plannedExpenseRepository.save(expense);
    }
    public PlannedExpensesDashboard getDashboardData(int daysFromNow, int amount){
        LocalDateTime date = LocalDateTime.now()
                .with(LocalTime.of(23, 59))
                .plusDays(daysFromNow);
        List<PlannedExpense> expenses = plannedExpenseRepository.findAllByDateBeforeOrderByDateAsc(date);
        PlannedExpensesDashboard dashboardData = new PlannedExpensesDashboard();
        dashboardData.setTotalPlannedExpenses(expenses.size());
        dashboardData.setPlannedExpenses(expenses.subList(0, Math.min(amount, expenses.size())));
        return dashboardData;
    }
}
