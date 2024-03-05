package com.fijalkowskim.financemanager.models.analytics;

import lombok.Data;

import java.util.Date;

@Data
public class CostPerDate {
    double cost;
    Date date;

    public CostPerDate(double cost, Date date) {
        this.cost = cost;
        this.date = date;
    }

    public CostPerDate() {
    }
}
