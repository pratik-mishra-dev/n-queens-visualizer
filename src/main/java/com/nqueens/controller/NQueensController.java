package com.nqueens.controller;

import com.nqueens.model.NQueensRequest;
import com.nqueens.model.NQueensResponse;
import com.nqueens.service.NQueensService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nqueens")
public class NQueensController {
    private final NQueensService nQueensService;

    public NQueensController(NQueensService nQueensService) {
        this.nQueensService = nQueensService;
    }

    @PostMapping("/solve")
    public ResponseEntity<NQueensResponse> solve(@Valid @RequestBody NQueensRequest request) {
        return ResponseEntity.ok(nQueensService.solve(request.n()));
    }
}
