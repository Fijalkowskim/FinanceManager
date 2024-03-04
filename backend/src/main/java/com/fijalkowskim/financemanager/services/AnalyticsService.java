package com.fijalkowskim.financemanager.services;

import com.fijalkowskim.financemanager.dao.ExpenseRepository;
import com.fijalkowskim.financemanager.models.AnalyticsDashboardData;
import com.fijalkowskim.financemanager.models.CostPerDate;
import com.fijalkowskim.financemanager.models.CostPerMonth;
import com.fijalkowskim.financemanager.models.Expense;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.*;
import java.util.*;

@Service
@Transactional
public class AnalyticsService {
    private final ExpenseRepository expenseRepository;
    @Autowired
    public AnalyticsService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Integer> getYearsWithExpenses(){
        return expenseRepository.findDistinctYearsWithExpenses();
    }
    public AnalyticsDashboardData getDailyAnalytics(int days, String category) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(days).withHour(0).withMinute(0).withSecond(1);

        List<Expense> expenses = getExpensesFromTimeRange(startDate,endDate,category);

        AnalyticsDashboardData analyticsDashboardData = new AnalyticsDashboardData();
        Map<LocalDate, Float> dailyExpensesMap = new HashMap<>();

        for (Expense expense : expenses) {
            LocalDate expenseDate = expense.getDate().toLocalDate();
            Float currentAmount = dailyExpensesMap.getOrDefault(expenseDate, 0.0f);
            dailyExpensesMap.put(expenseDate, currentAmount + expense.getCost());
        }

        List<CostPerDate> costsPerDateList = new ArrayList<>();
        for (Map.Entry<LocalDate, Float> entry : dailyExpensesMap.entrySet()) {
            CostPerDate costPerDate = new CostPerDate();
            costPerDate.setDate(Date.from(entry.getKey().atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()));
            costPerDate.setCost(entry.getValue());
            costsPerDateList.add(costPerDate);
        }
        costsPerDateList.sort(Comparator.comparing(CostPerDate::getDate));
        analyticsDashboardData.setCostsPerDate(costsPerDateList);
        analyticsDashboardData.setCostsPerMonth(new ArrayList<>());
        return analyticsDashboardData;
    }
    public AnalyticsDashboardData getAnnualAnalytics(int years, String category) {
        int targetedYear = LocalDateTime.now().minusYears(years).getYear();
        LocalDateTime endDate = LocalDateTime.of(targetedYear, Month.DECEMBER, 31, 23, 59, 59);
        LocalDateTime startDate = LocalDateTime.of(targetedYear, Month.JANUARY, 1, 0, 0, 0);

        List<Expense> expenses = getExpensesFromTimeRange(startDate, endDate, category);

        AnalyticsDashboardData analyticsDashboardData = new AnalyticsDashboardData();
        Map<YearMonth, Float> monthlyExpensesMap = new HashMap<>();

        for (Expense expense : expenses) {
            YearMonth expenseMonth = YearMonth.from(expense.getDate());
            Float currentAmount = monthlyExpensesMap.getOrDefault(expenseMonth, 0.0f);
            monthlyExpensesMap.put(expenseMonth, currentAmount + expense.getCost());
        }

        List<CostPerMonth> costsPerMonthList = new ArrayList<>();
        for (Map.Entry<YearMonth, Float> entry : monthlyExpensesMap.entrySet()) {
            CostPerMonth costPerMonth = new CostPerMonth();
            costPerMonth.setMonth(entry.getKey().getMonthValue());
            costPerMonth.setCost(entry.getValue());
            costsPerMonthList.add(costPerMonth);
        }

        costsPerMonthList.sort(Comparator.comparing(CostPerMonth::getMonth));
        analyticsDashboardData.setCostsPerMonth(costsPerMonthList);
        analyticsDashboardData.setCostsPerDate(new ArrayList<>());
        return analyticsDashboardData;
    }
    private List<Expense> getExpensesFromTimeRange(LocalDateTime startDate, LocalDateTime endDate, String category){
        return category.isEmpty() ?
                expenseRepository.findAllByDateBetweenOrderByDateAsc(startDate, endDate):
                expenseRepository.findAllByCategoryAndDateBetweenOrderByDateAsc(category,startDate,endDate);
    }
}
