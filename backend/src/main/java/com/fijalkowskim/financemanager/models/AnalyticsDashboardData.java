package com.fijalkowskim.financemanager.models;

import lombok.Data;
import java.util.List;
@Data
public class AnalyticsDashboardData {
    List<CostPerDate> costsPerDate;
    List<CostPerMonth> costsPerMonth;

}
