package com.fijalkowskim.financemanager.models;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class AnalyticsDashboardData {
    String dashboardType;
    LocalDateTime startDate;
    LocalDateTime endDate;
    List<CostPerDate> costsPerDate;
    List<CostPerMonth> costsPerMonth;
    List<CostPerCategory> costsPerCategory;
    CostPerCategory topCategory;
}
