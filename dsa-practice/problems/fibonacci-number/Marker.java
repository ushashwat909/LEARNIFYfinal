class Marker {
    public int solve(int A) {
        if (A == 0) {
            return 0;
        }
        if (A == 1) {
            return 1;
        }
        if (A == 2) {
            return 1;
        }
        
        int[] dp = new int[A + 1];
        dp[0] = 0;
        dp[1] = 1;
        dp[2] = 1;
        
        for (int i = 3; i <= A; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[A];
    }

    public boolean isCorrect(int A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

