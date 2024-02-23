package com.fijalkowskim.financemanager.controllers;

import com.fijalkowskim.financemanager.models.Expense;
import com.fijalkowskim.financemanager.requestmodels.ExpenseRequest;
import com.fijalkowskim.financemanager.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/expense")
@CrossOrigin("http://localhost:3000")
public class ExpenseController {
    private ExpenseService expenseService;
    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping("")
    public Page<Expense> getExpenses(@RequestParam(name = "page", defaultValue = "0") int page,
                                     @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return expenseService.getExpenses(pageRequest);
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
    @PostMapping("")
    public ResponseEntity<Expense> addExpense(@RequestBody ExpenseRequest expenseRequest){
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
    @PatchMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable long id, @RequestBody ExpenseRequest expenseRequest){
        try{
            Expense expense = expenseService.updateExpense(id, expenseRequest);
            return ResponseEntity.status(HttpStatus.OK).body(expense);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
