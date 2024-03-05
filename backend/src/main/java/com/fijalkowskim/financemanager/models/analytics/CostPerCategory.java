package com.fijalkowskim.financemanager.models.analytics;

import lombok.Data;

@Data
public class CostPerCategory {
    String category;
    double cost;

    public CostPerCategory(String category, double cost) {
        this.category = category;
        this.cost = cost;
    }

    public CostPerCategory() {
    }
}
