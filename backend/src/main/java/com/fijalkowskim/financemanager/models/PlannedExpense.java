package com.fijalkowskim.financemanager.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name="planned_expenses")
@Data
public class PlannedExpense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;
    @Column(name="cost",nullable = false)
    private float cost;
    @Column(name="category",nullable = false)
    private String category;
    @Column(name="description")
    private String description;
    @Column(name="date",nullable = false)
    private LocalDateTime date;
}
