package com.fijalkowskim.financemanager.models.dashboards;

import com.fijalkowskim.financemanager.models.analytics.CategoriesAnalytics;
import com.fijalkowskim.financemanager.models.analytics.CostPerCategory;
import com.fijalkowskim.financemanager.models.expences.Expense;
import lombok.Data;

import java.util.List;

@Data
public class DashboardData {
    double monthlySpending;
    Expense topExpense;
    CategoriesAnalytics categoriesAnalytics;
}
