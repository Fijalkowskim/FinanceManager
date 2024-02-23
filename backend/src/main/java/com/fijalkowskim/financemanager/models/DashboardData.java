package com.fijalkowskim.financemanager.models;

import lombok.Data;
import org.springframework.data.util.Pair;

import java.util.List;
import java.util.Map;

@Data
public class DashboardData {
    double monthlySpending;
    CostPerCategory topCategory;
    Expense topExpense;
    List<CostPerCategory> costsPerCategory;
}
