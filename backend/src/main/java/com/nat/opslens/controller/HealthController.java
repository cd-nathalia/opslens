package com.nat.opslens.controller;

import com.nat.opslens.dto.HealthResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public HealthResponse health() {
        return new HealthResponse(
                "UP",
                "OpsLens",
                "Backend is running"
        );
    }
}