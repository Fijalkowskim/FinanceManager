package com.fijalkowskim.financemanager.controllers;

import com.fijalkowskim.financemanager.models.DashboardData;
import com.fijalkowskim.financemanager.models.Expense;
import com.fijalkowskim.financemanager.models.PlannedExpense;
import com.fijalkowskim.financemanager.requestmodels.ExpenseRequest;
import com.fijalkowskim.financemanager.requestmodels.PlannedExpenseRequest;
import com.fijalkowskim.financemanager.services.ExpenseService;
import com.fijalkowskim.financemanager.services.PlannedExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/planned_expenses")
@CrossOrigin("http://localhost:3000")
public class PlannedExpenseController {
    private PlannedExpenseService plannedExpenseService;
    @Autowired
    public PlannedExpenseController(PlannedExpenseService expenseService) {
        this.plannedExpenseService = expenseService;
    }

    @GetMapping("")
    public Page<PlannedExpense> getPlannedExpenses(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "sortCost", required = false) String sortCost,
            @RequestParam(name = "sortDate", defaultValue = "desc") String sortDate)
    {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return category == null ? plannedExpenseService.getExpenses(pageRequest,sortCost, sortDate) : plannedExpenseService.getExpensesForCategory(pageRequest,category,sortCost, sortDate);
    }
    @GetMapping("/{id}")
    public ResponseEntity<PlannedExpense> getPlannedExpense(@PathVariable long id){
        try{
            PlannedExpense expense = plannedExpenseService.getExpense(id);
            return ResponseEntity.status(HttpStatus.OK).body(expense);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PostMapping("")
    public ResponseEntity<PlannedExpense> addPlannedExpense(@RequestBody PlannedExpenseRequest expenseRequest) throws RuntimeException{
        if(expenseRequest.getCost() <= 0){
            throw new RuntimeException("Expense cost must be greater than 0.");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(plannedExpenseService.addExpense(expenseRequest));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlannedExpense(@PathVariable long id){
        try{
            plannedExpenseService.deleteExpense(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<PlannedExpense> updatePlannedExpense(@PathVariable long id, @RequestBody PlannedExpenseRequest expenseRequest){
        if(expenseRequest.getCost() <= 0){
            throw new RuntimeException("Expense cost must be greater than 0.");
        }
        try{
            PlannedExpense expense = plannedExpenseService.updateExpense(id, expenseRequest);
            return ResponseEntity.status(HttpStatus.OK).body(expense);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
