package com.nqueens.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record NQueensRequest(
        @NotNull(message = "N is required")
        @Min(value = 1, message = "N must be at least 1")
        @Max(value = 12, message = "N must not exceed 12")
        Integer n) { }
