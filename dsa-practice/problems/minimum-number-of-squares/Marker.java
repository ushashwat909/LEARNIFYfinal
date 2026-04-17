class Marker {
    public int countMinSquares(int A) {
        // Create a DP array to store the minimum squares for all numbers up to A
        int[] dp = new int[A + 1];
        
        // Initialize with a large value (infinity equivalent)
        for (int i = 1; i <= A; i++) {
            dp[i] = Integer.MAX_VALUE;
        }
        
        dp[0] = 0; // Base case: 0 squares needed to represent 0
        
        // Fill the DP array
        for (int i = 1; i <= A; i++) {
            int j = 1;
            while (j * j <= i) {
                if (dp[i - j * j] != Integer.MAX_VALUE) {
                    dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
                }
                j++;
            }
        }
        
        return dp[A];
    }

    public boolean isCorrect(int A, int output) {
        int expected = countMinSquares(A);
        return expected == output;
    }
}

