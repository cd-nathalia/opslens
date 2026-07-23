package com.nat.opslens.service;

import com.nat.opslens.dto.AiAnalysisResult;
import com.nat.opslens.dto.AnalysisRequest;
import com.nat.opslens.dto.AnalysisResponse;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class AnalysisService {

    private final GeminiClient geminiClient;

    public AnalysisService(GeminiClient geminiClient) {
        this.geminiClient = geminiClient;
    }

    public AnalysisResponse analyze(AnalysisRequest request) {
        AiAnalysisResult aiResult =
                geminiClient.analyze(request.input());

        return new AnalysisResponse(
                UUID.randomUUID(),
                "COMPLETED",
                aiResult.infrastructureOverview(),
                aiResult.securityFindings(),
                aiResult.operationalRisks(),
                aiResult.suggestedNextSteps(),
                Instant.now()
        );
    }
}