package com.nqueens.service;

import com.nqueens.model.NQueensResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NQueensService {

    public NQueensResponse solve(int n) {
        List<List<String>> solutions = new ArrayList<>();
        boolean[] columns = new boolean[n];
        boolean[] diagonal1 = new boolean[2 * n - 1]; // row - column + n - 1
        boolean[] diagonal2 = new boolean[2 * n - 1]; // row + column
        int[] queenColumns = new int[n];

        placeQueens(0, n, columns, diagonal1, diagonal2, queenColumns, solutions);
        return new NQueensResponse(n, solutions.size(), solutions);
    }

    private void placeQueens(int row, int n, boolean[] columns, boolean[] diagonal1,
                             boolean[] diagonal2, int[] queenColumns,
                             List<List<String>> solutions) {
        if (row == n) {
            solutions.add(toBoard(queenColumns, n));
            return;
        }

        for (int column = 0; column < n; column++) {
            int leftDiagonal = row - column + n - 1;
            int rightDiagonal = row + column;
            if (columns[column] || diagonal1[leftDiagonal] || diagonal2[rightDiagonal]) {
                continue;
            }

            columns[column] = diagonal1[leftDiagonal] = diagonal2[rightDiagonal] = true;
            queenColumns[row] = column;
            placeQueens(row + 1, n, columns, diagonal1, diagonal2, queenColumns, solutions);
            columns[column] = diagonal1[leftDiagonal] = diagonal2[rightDiagonal] = false;
        }
    }

    private List<String> toBoard(int[] queenColumns, int n) {
        List<String> board = new ArrayList<>();
        for (int row = 0; row < n; row++) {
            StringBuilder line = new StringBuilder(".".repeat(n));
            line.setCharAt(queenColumns[row], 'Q');
            board.add(line.toString());
        }
        return board;
    }
}
