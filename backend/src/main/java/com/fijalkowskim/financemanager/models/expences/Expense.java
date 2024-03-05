package com.fijalkowskim.financemanager.models.expences;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name="expenses")
@Data
public class Expense {
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
