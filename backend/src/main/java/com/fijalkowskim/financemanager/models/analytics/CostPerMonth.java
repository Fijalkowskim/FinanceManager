package com.fijalkowskim.financemanager.models.analytics;

import lombok.Data;

import java.util.Date;

@Data
public class CostPerMonth {
    double cost;
    int month;

    public CostPerMonth(double cost, int month) {
        this.cost = cost;
        this.month = month;
    }

    public CostPerMonth() {
    }
}
