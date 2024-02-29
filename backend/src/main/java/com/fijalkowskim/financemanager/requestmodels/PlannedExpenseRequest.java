package com.fijalkowskim.financemanager.requestmodels;

import lombok.Data;

import java.util.Optional;

@Data
public class PlannedExpenseRequest {
    private float cost;
    private String category;
    private Optional<String> description;
}
