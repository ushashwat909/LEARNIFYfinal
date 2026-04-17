class Marker {
    public int solve(int A, int[] B, int[] C) {
        int[] dp = new int[A + 1]; // DP array for knapsack capacity
        
        for (int i = 0; i < B.length; i++) {
            // Iterate forward to allow using the same item multiple times
            for (int w = C[i]; w <= A; w++) {
                dp[w] = Math.max(dp[w], dp[w - C[i]] + B[i]);
            }
        }
        
        return dp[A];
    }

    public boolean isCorrect(int A, int[] B, int[] C, int output) {
        int expected = solve(A, B, C);
        return expected == output;
    }
}

