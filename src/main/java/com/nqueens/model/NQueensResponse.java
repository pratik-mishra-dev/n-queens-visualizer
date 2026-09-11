package com.nqueens.model;

import java.util.List;

public record NQueensResponse(int n, int solutionCount, List<List<String>> solutions) { }
