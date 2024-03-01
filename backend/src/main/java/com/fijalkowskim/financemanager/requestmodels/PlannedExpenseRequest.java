package com.fijalkowskim.financemanager.requestmodels;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Optional;

@Data
public class PlannedExpenseRequest {
    private float cost;
    private String category;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;
    private Optional<String> description;

}
