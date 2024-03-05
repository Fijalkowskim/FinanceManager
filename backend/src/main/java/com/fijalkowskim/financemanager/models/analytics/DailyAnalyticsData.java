package com.fijalkowskim.financemanager.models.analytics;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class DailyAnalyticsData  extends AnalyticsData{
    List<CostPerDate> costsPerDate;
    List<CostPerDate> previousCostsPerDate;
}
