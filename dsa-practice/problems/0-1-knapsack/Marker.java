class Marker {
    public int solve(int[] A, int[] B, int C) {
        int N = A.length; // Number of items
        int[] dp = new int[C + 1]; // DP array for knapsack capacity
        
        for (int i = 0; i < N; i++) {
            // Iterate backwards to avoid using the same item twice
            for (int w = C; w >= B[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - B[i]] + A[i]);
            }
        }
        
        return dp[C];
    }

    public boolean isCorrect(int[] A, int[] B, int C, int output) {
        int expected = solve(A, B, C);
        return expected == output;
    }
}

