package com.fijalkowskim.financemanager.models.dashboards;

import com.fijalkowskim.financemanager.models.expences.PlannedExpense;
import lombok.Data;

import java.util.List;
@Data
public class PlannedExpensesDashboard {
    List<PlannedExpense> plannedExpenses;
    int totalPlannedExpenses;
}
