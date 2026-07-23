package com.nat.opslens.dto;

import java.util.List;

public record AiAnalysisResult(
        InfrastructureOverview infrastructureOverview,
        List<ReportItem> securityFindings,
        List<ReportItem> operationalRisks,
        List<ReportItem> suggestedNextSteps
) {
}
