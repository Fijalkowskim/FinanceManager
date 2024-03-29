package com.fijalkowskim.financemanager.controllers;

import com.fijalkowskim.financemanager.models.dashboards.DashboardData;
import com.fijalkowskim.financemanager.models.expences.Expense;
import com.fijalkowskim.financemanager.requestmodels.ExpenseRequest;
import com.fijalkowskim.financemanager.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin("http://localhost:3000")
public class ExpenseController {
    private final ExpenseService expenseService;
    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping("")
    public Page<Expense> getExpenses(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "sortCost", required = false) String sortCost,
            @RequestParam(name = "sortDate", defaultValue = "desc") String sortDate)
    {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return category == null ? expenseService.getExpenses(pageRequest,sortCost, sortDate) : expenseService.getExpensesForCategory(pageRequest,category,sortCost, sortDate);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpense(@PathVariable long id){
        try{
            Expense expense = expenseService.getExpense(id);
            return ResponseEntity.status(HttpStatus.OK).body(expense);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/monthly")
    public Page<Expense> getExpensesForMonth(
            @RequestParam(name = "year") int year,
            @RequestParam(name = "month") int month,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){

        PageRequest pageRequest = PageRequest.of(page, pageSize);

        return expenseService.getExpensesForMonth(year, month, pageRequest);
    }
    @GetMapping("/yearly")
    public Page<Expense> getExpensesForYear(
            @RequestParam(name = "year") int year,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){

        PageRequest pageRequest = PageRequest.of(page, pageSize);

        return expenseService.getExpensesForYear(year, pageRequest);
    }
    @PostMapping("")
    public ResponseEntity<Expense> addExpense(@RequestBody ExpenseRequest expenseRequest) throws RuntimeException{
        if(expenseRequest.getCost() <= 0){
            throw new RuntimeException("Expense cost must be greater than 0.");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.addExpense(expenseRequest));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable long id){
        try{
            expenseService.deleteExpense(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable long id, @RequestBody ExpenseRequest expenseRequest){
        if(expenseRequest.getCost() <= 0){
            throw new RuntimeException("Expense cost must be greater than 0.");
        }
        try{
            Expense expense = expenseService.updateExpense(id, expenseRequest);
            return ResponseEntity.status(HttpStatus.OK).body(expense);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardData> getDashboardData(
            @RequestParam(name = "year") int year,
            @RequestParam(name = "month") int month) {
        try {
            DashboardData dashboardData = expenseService.getDashboardData(year, month);
            return ResponseEntity.status(HttpStatus.OK).body(dashboardData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
