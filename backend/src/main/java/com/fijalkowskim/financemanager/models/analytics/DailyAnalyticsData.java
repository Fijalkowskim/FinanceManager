package com.fijalkowskim.financemanager.models.analytics;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class DailyAnalyticsData  extends AnalyticsData{
    List<CostPerDate> costsPerDate;
    List<CostPerDate> previousCostsPerDate;

    public DailyAnalyticsData(){

    }
    public DailyAnalyticsData(AnalyticsData analyticsData) {
        this.setStartDate(analyticsData.getStartDate());
        this.setEndDate(analyticsData.getEndDate());
        this.setTotalCosts(analyticsData.getTotalCosts());
        this.setTotalPreviousCosts(analyticsData.getTotalPreviousCosts());
        this.setComparedToPreviousCosts(analyticsData.getComparedToPreviousCosts());
        this.setCategoriesAnalytics(analyticsData.getCategoriesAnalytics());
    }
}
