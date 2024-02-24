package com.fijalkowskim.financemanager.exceptions;

import lombok.Data;

@Data
public class ResponseExceptionData {
    private String message;
    private int status;

    public ResponseExceptionData(String message, int status) {
        this.message = message;
        this.status = status;
    }

    public ResponseExceptionData() {
    }
}
