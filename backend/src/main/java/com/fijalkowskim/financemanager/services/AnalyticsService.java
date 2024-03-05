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
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(days).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime previousStartDate = startDate.minusDays(days).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime previousEndDate = startDate.minusSeconds(1);
        DailyAnalyticsData dailyAnalyticsData = new DailyAnalyticsData(getBaseAnalyticsData(startDate,endDate,previousStartDate,previousEndDate,category));

        dailyAnalyticsData.setCostsPerDate(calculateCostsPerDate(startDate,endDate,category));
        dailyAnalyticsData.setPreviousCostsPerDate(calculateCostsPerDate(previousStartDate, previousEndDate,category));

        return dailyAnalyticsData;
    }
    public AnnualAnalyticsData getAnnualAnalytics(int year, String category) {
        LocalDateTime startDate = LocalDateTime.of(year, Month.JANUARY, 1, 0, 0, 0);
        LocalDateTime endDate = LocalDateTime.of(year, Month.DECEMBER, 31, 23, 59, 59);
        LocalDateTime previousStartDate = startDate.minusYears(1);
        LocalDateTime previousEndDate =  endDate.minusYears(1);

        AnnualAnalyticsData annualAnalyticsData = new AnnualAnalyticsData(getBaseAnalyticsData(startDate,endDate,previousStartDate,previousEndDate,category));
        annualAnalyticsData.setCostsPerMonth(calculateCostsPerMonth(startDate,endDate,category));
        annualAnalyticsData.setPreviousCostsPerMonth(calculateCostsPerMonth(previousStartDate, previousEndDate,category));

        return annualAnalyticsData;
    }
    private List<Expense> getExpensesFromTimeRange(LocalDateTime startDate, LocalDateTime endDate, String category){
        return category.isEmpty() ?
                expenseRepository.findAllByDateBetweenOrderByDateAsc(startDate, endDate):
                expenseRepository.findAllByCategoryAndDateBetweenOrderByDateAsc(category,startDate,endDate);
    }
    private AnalyticsData getBaseAnalyticsData(LocalDateTime startDate, LocalDateTime endDate,LocalDateTime previousStartDate, LocalDateTime previousEndDate, String category){
        AnalyticsData analyticsData = new AnalyticsData();
        analyticsData.setStartDate(startDate);
        analyticsData.setEndDate(endDate);
        analyticsData.setPreviousStartDate(previousStartDate);
        analyticsData.setPreviousEndDate(previousEndDate);

        double totalCosts, totalPreviousCosts;
        if(category.isEmpty()) {
            analyticsData.setCategoriesAnalytics(expenseService.calculateCostsPerCategory(expenseRepository.calculateCostsPerCategoryBetweenDates(startDate, endDate)));
            totalCosts = Optional.ofNullable(expenseRepository.calculateTotalSpendingBetweenDates(startDate,endDate)).orElse(0.0);
            totalPreviousCosts = Optional.ofNullable(expenseRepository.calculateTotalSpendingBetweenDates(previousStartDate,previousEndDate)).orElse(0.0);
        }
        else{
            totalCosts = Optional.ofNullable(expenseRepository.calculateTotalSpendingBetweenDatesForCategory(startDate,endDate,category)).orElse(0.0);
            totalPreviousCosts = Optional.ofNullable(expenseRepository.calculateTotalSpendingBetweenDatesForCategory(previousStartDate,previousEndDate,category)).orElse(0.0);
        }
        double costDifference = calculatePercentageDifference(totalPreviousCosts, totalCosts);
        String comparedToPreviousCosts = formatPercentageDifference(costDifference);
        analyticsData.setTotalCosts(totalCosts);
        analyticsData.setTotalPreviousCosts(totalPreviousCosts);
        analyticsData.setComparedToPreviousCosts(comparedToPreviousCosts);

        return analyticsData;
    }
    private List<CostPerMonth> calculateCostsPerMonth(LocalDateTime startDate, LocalDateTime endDate, String category){
        //Calculate monthly expenses
        Map<YearMonth, Double> monthlyExpensesMap = getExpensesFromTimeRange(startDate, endDate, category).stream()
                .collect(Collectors.groupingBy(expense -> YearMonth.from(expense.getDate()),
                        Collectors.summingDouble(Expense::getCost)));

        return monthlyExpensesMap.entrySet().stream()
                .map(entry -> new CostPerMonth(entry.getValue(),entry.getKey().getMonthValue()))
                .sorted(Comparator.comparing(CostPerMonth::getMonth))
                .collect(Collectors.toList());
    }
    private List<CostPerDate> calculateCostsPerDate(LocalDateTime startDate, LocalDateTime endDate, String category){
        //Calculate daily expenses
        Map<LocalDate, Double> dailyExpensesMap = getExpensesFromTimeRange(startDate,endDate,category).stream()
                .collect(Collectors.groupingBy(expense -> expense.getDate().toLocalDate(),
                        Collectors.summingDouble(Expense::getCost)));

        //Set cost per date
        return dailyExpensesMap.entrySet().stream()
                .map(entry -> new CostPerDate(entry.getValue(),Date.from(entry.getKey().atStartOfDay().atZone(ZoneId.systemDefault()).toInstant())))
                .sorted(Comparator.comparing(CostPerDate::getDate))
                .collect(Collectors.toList());
    }

    private double calculatePercentageDifference(double previousValue, double currentValue) {
        if (previousValue == 0.0) {
            return currentValue > 0.0 ? 100.0 : 0.0;
        }

        return ((currentValue - previousValue) / Math.abs(previousValue)) * 100.0;
    }

    private String formatPercentageDifference(double percentageDifference) {
        if (percentageDifference > 0.0) {
            return String.format("+%.2f%%", percentageDifference);
        } else if (percentageDifference < 0.0) {
            return String.format("%.2f%%", percentageDifference);
        } else {
            return "0.00%";
        }
    }

}
