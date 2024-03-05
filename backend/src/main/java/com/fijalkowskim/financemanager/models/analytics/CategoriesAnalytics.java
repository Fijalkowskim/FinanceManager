package com.fijalkowskim.financemanager.models.analytics;

import lombok.Data;

import java.util.List;

@Data
public class CategoriesAnalytics {
    List<CostPerCategory> costsPerCategory;
    CostPerCategory topCategory;

    public CategoriesAnalytics() {
    }

    public CategoriesAnalytics(List<CostPerCategory> costsPerCategory, CostPerCategory topCategory) {
        this.costsPerCategory = costsPerCategory;
        this.topCategory = topCategory;
    }
}
