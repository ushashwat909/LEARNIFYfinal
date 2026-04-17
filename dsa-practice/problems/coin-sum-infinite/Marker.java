class Marker {
    public int coinchange2(int[] A, int B) {
        int MOD = 1000007; // 10^6 + 7
        int[] dp = new int[B + 1]; // DP array to store the number of ways
        dp[0] = 1; // Base case: 1 way to make sum 0 (use no coins)
        
        // Iterate over each coin
        for (int coin : A) {
            for (int x = coin; x <= B; x++) {
                dp[x] = (dp[x] + dp[x - coin]) % MOD;
            }
        }
        
        return dp[B];
    }

    public boolean isCorrect(int[] A, int B, int output) {
        int expected = coinchange2(A, B);
        return expected == output;
    }
}

