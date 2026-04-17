class Marker {
    public int solve(int A, int B) {
        int MOD = 1000000007;
        
        // Initialize a DP table with dimensions (A+1) x (B+1)
        long[][] dp = new long[A + 1][B + 1];
        
        // Base case: if we want 1-digit number that sums up to any number from 1 to 9
        for (int digit = 1; digit <= 9; digit++) {
            if (digit <= B) {
                dp[1][digit] = 1;
            }
        }
        
        // Fill the DP table for all other cases
        for (int digits = 2; digits <= A; digits++) {
            for (int sumVal = 1; sumVal <= B; sumVal++) {
                long ways = 0;
                for (int d = 0; d <= 9; d++) {
                    if (sumVal - d >= 0) {
                        ways = (ways + dp[digits - 1][sumVal - d]) % MOD;
                    }
                }
                dp[digits][sumVal] = ways;
            }
        }
        
        return (int) (dp[A][B] % MOD);
    }

    public boolean isCorrect(int A, int B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}

