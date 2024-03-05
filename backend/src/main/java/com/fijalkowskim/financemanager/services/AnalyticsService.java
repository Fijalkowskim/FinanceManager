package com.fijalkowskim.financemanager.services;

import com.fijalkowskim.financemanager.dao.ExpenseRepository;
import com.fijalkowskim.financemanager.models.analytics.*;
import com.fijalkowskim.financemanager.models.expences.Expense;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

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
    public DailyAnalyticsData getDailyAnalytics(int days, String category) {
        DailyAnalyticsData dailyAnalyticsData = new DailyAnalyticsData();

        //Calculate dates
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(days).withHour(0).withMinute(0).withSecond(0);
        dailyAnalyticsData.setStartDate(startDate);
        dailyAnalyticsData.setEndDate(endDate);

        //Calculate daily expenses
        List<Expense> expenses = getExpensesFromTimeRange(startDate,endDate,category);
        Map<LocalDate, Double> dailyExpensesMap = expenses.stream()
                .collect(Collectors.groupingBy(expense -> expense.getDate().toLocalDate(),
                        Collectors.summingDouble(Expense::getCost)));

        //Set cost per date
        List<CostPerDate> costsPerDateList = dailyExpensesMap.entrySet().stream()
                .map(entry -> new CostPerDate(entry.getValue(),Date.from(entry.getKey().atStartOfDay().atZone(ZoneId.systemDefault()).toInstant())))
                .sorted(Comparator.comparing(CostPerDate::getDate))
                .collect(Collectors.toList());
        dailyAnalyticsData.setCostsPerDate(costsPerDateList);

        //Calculate cost per category
        if(category.isEmpty()) {
            dailyAnalyticsData.setCategoriesAnalytics(
                    expenseService.calculateCostsPerCategory(expenseRepository.calculateCostsPerCategoryBetweenDates(startDate, endDate)));
        }

        return dailyAnalyticsData;
    }
    public AnnualAnalyticsData getAnnualAnalytics(int year, String category) {
        AnnualAnalyticsData annualAnalyticsData = new AnnualAnalyticsData();

        //Calculate dates
        LocalDateTime endDate = LocalDateTime.of(year, Month.DECEMBER, 31, 23, 59, 59);
        LocalDateTime startDate = LocalDateTime.of(year, Month.JANUARY, 1, 0, 0, 0);
        annualAnalyticsData.setStartDate(startDate);
        annualAnalyticsData.setEndDate(endDate);

        //Calculate monthly expenses
        List<Expense> expenses = getExpensesFromTimeRange(startDate, endDate, category);
        Map<YearMonth, Double> monthlyExpensesMap = expenses.stream()
                .collect(Collectors.groupingBy(expense -> YearMonth.from(expense.getDate()),
                        Collectors.summingDouble(Expense::getCost)));

        //Set cost per month
        List<CostPerMonth> costsPerMonthList = monthlyExpensesMap.entrySet().stream()
                .map(entry -> new CostPerMonth(entry.getValue(),entry.getKey().getMonthValue()))
                .sorted(Comparator.comparing(CostPerMonth::getMonth))
                .collect(Collectors.toList());

        annualAnalyticsData.setCostsPerMonth(costsPerMonthList);

        //Calculate cost per category
        if(category.isEmpty()) {
            annualAnalyticsData.setCategoriesAnalytics(
                    expenseService.calculateCostsPerCategory(expenseRepository.calculateCostsPerCategoryBetweenDates(startDate, endDate)));
        }
        return annualAnalyticsData;
    }
    private List<Expense> getExpensesFromTimeRange(LocalDateTime startDate, LocalDateTime endDate, String category){
        return category.isEmpty() ?
                expenseRepository.findAllByDateBetweenOrderByDateAsc(startDate, endDate):
                expenseRepository.findAllByCategoryAndDateBetweenOrderByDateAsc(category,startDate,endDate);
    }

}
