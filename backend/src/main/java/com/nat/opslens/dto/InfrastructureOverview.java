package com.nat.opslens.dto;

import java.util.List;

public record InfrastructureOverview(
        String summary,
        List<String> detectedComponents
) {
}