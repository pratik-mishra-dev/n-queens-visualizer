package com.nqueens.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NQueensServiceTest {
    private final NQueensService service = new NQueensService();

    @Test
    void generatesKnownSolutionCounts() {
        assertEquals(1, service.solve(1).solutionCount());
        assertEquals(0, service.solve(2).solutionCount());
        assertEquals(0, service.solve(3).solutionCount());
        assertEquals(2, service.solve(4).solutionCount());
        assertEquals(10, service.solve(5).solutionCount());
        assertEquals(4, service.solve(6).solutionCount());
        assertEquals(40, service.solve(7).solutionCount());
        assertEquals(92, service.solve(8).solutionCount());
    }
}
