package com.fijalkowskim.financemanager.requestmodels;

import lombok.Data;

import java.util.Date;
import java.util.Optional;

@Data
public class ExpenseRequest {
    private float cost;
    private String category;
    private Optional<String> description;
}
