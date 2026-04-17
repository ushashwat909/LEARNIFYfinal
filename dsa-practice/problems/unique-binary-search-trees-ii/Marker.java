class Marker {
    public int numTrees(int A) {
        // Catalan numbers approach for counting unique BSTs
        int[] dp = new int[A + 1];
        dp[0] = 1;
        dp[1] = 1;
        
        // Fill the DP table
        for (int i = 2; i <= A; i++) {
            for (int j = 0; j < i; j++) {
                dp[i] += dp[j] * dp[i - j - 1];
            }
        }
        
        return dp[A];
    }

    public boolean isCorrect(int A, int output) {
        int expected = numTrees(A);
        return expected == output;
    }
}

