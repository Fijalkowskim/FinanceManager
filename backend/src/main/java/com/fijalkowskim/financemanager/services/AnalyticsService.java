package com.fijalkowskim.financemanager.services;

import com.fijalkowskim.financemanager.dao.ExpenseRepository;
import com.fijalkowskim.financemanager.models.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.*;

@Service
@Transactional
public class AnalyticsService {
    private final ExpenseRepository expenseRepository;
    private final ExpenseService expenseService;
    @Autowired
    public AnalyticsService(ExpenseRepository expenseRepository, ExpenseService expenseService) {
        this.expenseRepository = expenseRepository;
        this.expenseService = expenseService;
    }

    public List<Integer> getYearsWithExpenses(){
        return expenseRepository.findDistinctYearsWithExpenses();
    }
    public AnalyticsDashboardData getDailyAnalytics(int days, String category) {
        AnalyticsDashboardData analyticsDashboardData = new AnalyticsDashboardData();
        analyticsDashboardData.setDashboardType("days");
        analyticsDashboardData.setCostsPerMonth(new ArrayList<>());

        //Calculate dates
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(days).withHour(0).withMinute(0).withSecond(0);
        analyticsDashboardData.setStartDate(startDate);
        analyticsDashboardData.setEndDate(endDate);

        //Calculate daily expenses
        List<Expense> expenses = getExpensesFromTimeRange(startDate,endDate,category);
        Map<LocalDate, Float> dailyExpensesMap = new HashMap<>();
        for (Expense expense : expenses) {
            LocalDate expenseDate = expense.getDate().toLocalDate();
            Float currentAmount = dailyExpensesMap.getOrDefault(expenseDate, 0.0f);
            dailyExpensesMap.put(expenseDate, currentAmount + expense.getCost());
        }

        //Set cost per date
        List<CostPerDate> costsPerDateList = new ArrayList<>();
        for (Map.Entry<LocalDate, Float> entry : dailyExpensesMap.entrySet()) {
            CostPerDate costPerDate = new CostPerDate();
            costPerDate.setDate(Date.from(entry.getKey().atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()));
            costPerDate.setCost(entry.getValue());
            costsPerDateList.add(costPerDate);
        }
        costsPerDateList.sort(Comparator.comparing(CostPerDate::getDate));
        analyticsDashboardData.setCostsPerDate(costsPerDateList);

        //Calculate cost per category
        Pair<List<CostPerCategory>,CostPerCategory> calculatedCategoriesData =
                expenseService.calculateCostsPerCategoryForMonth(expenseRepository.calculateCostsPerCategoryBetweenDates(startDate,endDate));
        analyticsDashboardData.setCostsPerCategory(calculatedCategoriesData.getFirst());
        analyticsDashboardData.setTopCategory(calculatedCategoriesData.getSecond());

        return analyticsDashboardData;
    }
    public AnalyticsDashboardData getAnnualAnalytics(int year, String category) {
        AnalyticsDashboardData analyticsDashboardData = new AnalyticsDashboardData();
        analyticsDashboardData.setDashboardType("year");
        analyticsDashboardData.setCostsPerDate(new ArrayList<>());

        //Calculate dates
        LocalDateTime endDate = LocalDateTime.of(year, Month.DECEMBER, 31, 23, 59, 59);
        LocalDateTime startDate = LocalDateTime.of(year, Month.JANUARY, 1, 0, 0, 0);
        analyticsDashboardData.setStartDate(startDate);
        analyticsDashboardData.setEndDate(endDate);

        //Calculate monthly expenses
        List<Expense> expenses = getExpensesFromTimeRange(startDate, endDate, category);
        Map<YearMonth, Float> monthlyExpensesMap = new HashMap<>();
        for (Expense expense : expenses) {
            YearMonth expenseMonth = YearMonth.from(expense.getDate());
            Float currentAmount = monthlyExpensesMap.getOrDefault(expenseMonth, 0.0f);
            monthlyExpensesMap.put(expenseMonth, currentAmount + expense.getCost());
        }

        //Set cost per month
        List<CostPerMonth> costsPerMonthList = new ArrayList<>();
        for (Map.Entry<YearMonth, Float> entry : monthlyExpensesMap.entrySet()) {
            CostPerMonth costPerMonth = new CostPerMonth();
            costPerMonth.setMonth(entry.getKey().getMonthValue());
            costPerMonth.setCost(entry.getValue());
            costsPerMonthList.add(costPerMonth);
        }
        costsPerMonthList.sort(Comparator.comparing(CostPerMonth::getMonth));
        analyticsDashboardData.setCostsPerMonth(costsPerMonthList);

        //Calculate cost per category
        Pair<List<CostPerCategory>,CostPerCategory> calculatedCategoriesData =
                expenseService.calculateCostsPerCategoryForMonth(expenseRepository.calculateCostsPerCategoryBetweenDates(startDate,endDate));
        analyticsDashboardData.setCostsPerCategory(calculatedCategoriesData.getFirst());
        analyticsDashboardData.setTopCategory(calculatedCategoriesData.getSecond());

        return analyticsDashboardData;
    }
    private List<Expense> getExpensesFromTimeRange(LocalDateTime startDate, LocalDateTime endDate, String category){
        return category.isEmpty() ?
                expenseRepository.findAllByDateBetweenOrderByDateAsc(startDate, endDate):
                expenseRepository.findAllByCategoryAndDateBetweenOrderByDateAsc(category,startDate,endDate);
    }

}
