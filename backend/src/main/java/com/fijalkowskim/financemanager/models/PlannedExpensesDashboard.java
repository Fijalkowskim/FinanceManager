package com.fijalkowskim.financemanager.models;

import lombok.Data;

import java.util.List;
@Data
public class PlannedExpensesDashboard {
    List<PlannedExpense> plannedExpenses;
    int totalPlannedExpenses;
}
