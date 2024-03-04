package com.fijalkowskim.financemanager.controllers;

import com.fijalkowskim.financemanager.models.AnalyticsDashboardData;
import com.fijalkowskim.financemanager.services.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/analytics")
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    @Autowired
    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }
    @GetMapping("/days/{days}")
    public ResponseEntity<AnalyticsDashboardData>getDailyAnalytics (
            @PathVariable int days,
            @RequestParam(name = "category", defaultValue = "",required = false ) String category) {
        if(days <= 0){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(analyticsService.getDailyAnalytics(days, category));
    }
    @GetMapping("/year/{year}")
    public ResponseEntity<AnalyticsDashboardData>getAnnualAnalytics (
            @PathVariable int year,
            @RequestParam(name = "category", defaultValue = "",required = false ) String category) {
        if(year < 0){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(analyticsService.getAnnualAnalytics(year, category));
    }
    @GetMapping("/yearsWithExpenses")
    public ResponseEntity<List<Integer>>getYearsWithExpenses(){
        return ResponseEntity.ok().body(analyticsService.getYearsWithExpenses());
    }
}
