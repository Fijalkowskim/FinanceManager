package com.fijalkowskim.financemanager.services;

import com.fijalkowskim.financemanager.models.CostPerCategory;
import org.springframework.data.util.Pair;
import com.fijalkowskim.financemanager.dao.ExpenseRepository;
import com.fijalkowskim.financemanager.models.DashboardData;
import com.fijalkowskim.financemanager.models.Expense;
import com.fijalkowskim.financemanager.requestmodels.ExpenseRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
public class ExpenseService {
    private ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
     public Page<Expense> getExpenses(PageRequest pageRequest, String sortCost, String sortDate) throws RuntimeException{
        if(sortCost != null){
            if(sortCost.equals("asc")) return expenseRepository.findAllByOrderByCostAsc(pageRequest);
            else if (sortCost.equals("desc")) return expenseRepository.findAllByOrderByCostDesc(pageRequest);
            throw new RuntimeException("Bad cost sorting parameter.");
        }
        else if(sortDate.equals("desc")) return expenseRepository.findAllByOrderByDateDesc(pageRequest);
        else if(sortDate.equals("asc")) return expenseRepository.findAllByOrderByDateAsc(pageRequest);
        else throw new RuntimeException("Bad date sorting parameter.");
    }
    public Page<Expense> getExpensesForCategory(PageRequest pageRequest,String category, String sortCost, String sortDate) throws RuntimeException{
        if(sortCost != null){
            if(sortCost.equals("asc")) return expenseRepository.findAllByCategoryOrderByCostAsc(category,pageRequest);
            else if (sortCost.equals("desc")) return expenseRepository.findAllByCategoryOrderByCostDesc(category,pageRequest);
            throw new RuntimeException("Bad cost sorting parameter.");
        }
        else if(sortDate.equals("desc")) return expenseRepository.findAllByCategoryOrderByDateDesc(category,pageRequest);
        else if(sortDate.equals("asc")) return expenseRepository.findAllByCategoryOrderByDateAsc(category,pageRequest);
        else throw new RuntimeException("Bad date sorting parameter.");
    }
    public Expense getExpense(Long id) throws Exception {
        Optional<Expense> expense = expenseRepository.findById(id);
        if(expense.isEmpty()){
            throw new Exception("Expense not found");
        }
        return expense.get();
    }
    public Page<Expense> getExpensesForMonth(int year, int month, Pageable pageable) {
        LocalDateTime startOfMonth = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime endOfMonth = startOfMonth.plusMonths(1).minusNanos(1);

        return expenseRepository.findAllByDateBetweenOrderByDateDesc(startOfMonth, endOfMonth, pageable);
    }
    public Page<Expense> getExpensesForYear(int year, Pageable pageable) {
        LocalDateTime startOfYear = LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime endOfYear = startOfYear.plusYears(1).minusNanos(1);

        return expenseRepository.findAllByDateBetweenOrderByDateDesc(startOfYear, endOfYear, pageable);
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

    public DashboardData getDashboardData(int year, int month) {

        double monthlySpending = expenseRepository.calculateTotalSpendingForMonth(year, month);
        Expense topExpense = expenseRepository.findTopExpenseForMonth(year, month);

        Pair<List<CostPerCategory>,CostPerCategory> calculatedCategoriesData =  calculateCostsPerCategoryForMonth(year, month);
        DashboardData dashboardData = new DashboardData();
        dashboardData.setMonthlySpending(monthlySpending);
        dashboardData.setCostsPerCategory(calculatedCategoriesData.getFirst());
        dashboardData.setTopCategory(calculatedCategoriesData.getSecond());
        dashboardData.setTopExpense(topExpense);


        return dashboardData;
    }
    public Pair<List<CostPerCategory>,CostPerCategory> calculateCostsPerCategoryForMonth(int year, int month) {
        List<Object[]> results = expenseRepository.calculateCostsPerCategoryForMonth(year, month);

        List <CostPerCategory> costsPerCategory = new ArrayList<CostPerCategory>();
        CostPerCategory topCategory = null;


        for (Object[] result : results) {
            String category = (String) result[0];
            double totalCost = (Double) result[1];


            CostPerCategory costPerCategory = new CostPerCategory();
            costPerCategory.setCategory(category);
            costPerCategory.setCost(totalCost);

            if(topCategory == null || totalCost > topCategory.getCost()){
                topCategory = costPerCategory;
            }

            costsPerCategory.add(costPerCategory);
        }
        return Pair.of(costsPerCategory,topCategory);
    }
}
