class Marker {
    // Solve using difference array technique for range updates
    public int[] solve(int A, int[][] B) {
        int[] ans = new int[A];
        
        // Initialize difference array
        // For each query [L, R, P], add P at L-1 and subtract P at R
        for (int i = 0; i < B.length; i++) {
            int l = B[i][0] - 1; // Convert to 0-based indexing
            int r = B[i][1] - 1; // Convert to 0-based indexing
            int amt = B[i][2];
            
            ans[l] += amt;
            if (r + 1 < A) {
                ans[r + 1] -= amt;
            }
        }
        
        // Compute prefix sum to get final amounts
        for (int i = 1; i < A; i++) {
            ans[i] += ans[i - 1];
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int[][] B, int[] output) {
        int[] expected = solve(A, B);
        if (expected.length != output.length) {
            return false;
        }
        for (int i = 0; i < expected.length; i++) {
            if (expected[i] != output[i]) {
                return false;
            }
        }
        return true;
    }
}

