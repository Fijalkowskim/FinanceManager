package com.fijalkowskim.financemanager.models.analytics;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class AnnualAnalyticsData extends AnalyticsData{
    List<CostPerMonth> costsPerMonth;
    List<CostPerMonth> previousCostsPerMonth;
    public AnnualAnalyticsData(){

    }
    public AnnualAnalyticsData(AnalyticsData analyticsData) {
        this.setStartDate(analyticsData.getStartDate());
        this.setEndDate(analyticsData.getEndDate());
        this.setPreviousStartDate(analyticsData.getPreviousStartDate());
        this.setPreviousEndDate(analyticsData.getPreviousEndDate());
        this.setTotalCosts(analyticsData.getTotalCosts());
        this.setTotalPreviousCosts(analyticsData.getTotalPreviousCosts());
        this.setComparedToPreviousCosts(analyticsData.getComparedToPreviousCosts());
        this.setCategoriesAnalytics(analyticsData.getCategoriesAnalytics());
    }
}
