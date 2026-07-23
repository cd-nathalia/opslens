package com.nat.opslens.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AnalysisRequest(

        @NotBlank(message = "Input cannot be empty")
        @Size(max = 50_000, message = "Input cannot exceed 50,000 characters")
        String input

) {
}