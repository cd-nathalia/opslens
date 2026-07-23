package com.nat.opslens.controller;

import com.nat.opslens.dto.AnalysisRequest;
import com.nat.opslens.dto.AnalysisResponse;
import com.nat.opslens.service.AnalysisService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analyses")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalysisController {

    private final AnalysisService analysisService;

    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @PostMapping
    public AnalysisResponse analyze(
            @Valid @RequestBody AnalysisRequest request
    ) {
        return analysisService.analyze(request);
    }
}