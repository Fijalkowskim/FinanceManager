package com.fijalkowskim.financemanager.models.analytics;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class AnalyticsData {
    LocalDateTime startDate;
    LocalDateTime endDate;
    CategoriesAnalytics categoriesAnalytics;
}
