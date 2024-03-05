package com.fijalkowskim.financemanager.models.analytics;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class AnnualAnalyticsData extends AnalyticsData{
    List<CostPerMonth> costsPerMonth;
    List<CostPerMonth> previousCostsPerMonth;
}
