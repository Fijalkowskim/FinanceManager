package com.fijalkowskim.financemanager.controllers;

import com.fijalkowskim.financemanager.models.expences.Expense;
import com.fijalkowskim.financemanager.services.ExpenseService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ExpenseControllerTest {

    @Mock
    private ExpenseService expenseService;

    @InjectMocks
    private ExpenseController expenseController;

    @Test
    public void testGetExpenses() {
        PageRequest pageRequest = PageRequest.of(0, 20);
        when(expenseService.getExpenses(pageRequest,null,"desc")).thenReturn(new PageImpl<>(Collections.emptyList()));

        Page<Expense> result = expenseController.getExpenses(0, 20,null,null,  "desc");

        assertNotNull(result);
        assertEquals(0, result.getContent().size());
    }

    @Test
    public void testGetExpense() throws Exception{
        long expenseId = 1;
        Expense mockExpense = new Expense();
        when(expenseService.getExpense(expenseId)).thenReturn(mockExpense);

        ResponseEntity<Expense> result = expenseController.getExpense(expenseId);

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(mockExpense, result.getBody());
    }

}
