class Marker {
    public int uniquePathsWithObstacles(int[][] A) {
        int n = A.length;
        int m = A[0].length;
        
        // If start or end is blocked, no path is possible
        if (A[0][0] == 1 || A[n-1][m-1] == 1) {
            return 0;
        }
        
        // DP table
        int[][] dp = new int[n][m];
        dp[0][0] = 1; // Start point
        
        // Fill first column
        for (int i = 1; i < n; i++) {
            dp[i][0] = (A[i][0] == 0) ? dp[i-1][0] : 0;
        }
        
        // Fill first row
        for (int j = 1; j < m; j++) {
            dp[0][j] = (A[0][j] == 0) ? dp[0][j-1] : 0;
        }
        
        // Fill the rest of dp table
        for (int i = 1; i < n; i++) {
            for (int j = 1; j < m; j++) {
                if (A[i][j] == 0) {
                    dp[i][j] = dp[i-1][j] + dp[i][j-1];
                } else {
                    dp[i][j] = 0;
                }
            }
        }
        
        return dp[n-1][m-1];
    }

    public boolean isCorrect(int[][] A, int output) {
        int expected = uniquePathsWithObstacles(A);
        return expected == output;
    }
}

