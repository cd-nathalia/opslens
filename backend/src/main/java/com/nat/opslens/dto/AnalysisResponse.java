package com.nat.opslens.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record AnalysisResponse(
        UUID analysisId,
        String status,
        InfrastructureOverview infrastructureOverview,
        List<ReportItem> securityFindings,
        List<ReportItem> operationalRisks,
        List<ReportItem> suggestedNextSteps,
        Instant generatedAt
) {
}