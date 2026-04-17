class Marker {
    public int adjacent(int[][] A) {
        int N = A[0].length;
        
        // Create a list with the maximum values from each column
        int[] maxValues = new int[N];
        for (int i = 0; i < N; i++) {
            maxValues[i] = Math.max(A[0][i], A[1][i]);
        }
        
        // If there's only one column, return the maximum of the two values in that column
        if (N == 1) {
            return maxValues[0];
        }
        
        // DP array to store the maximum sum up to each column
        int[] dp = new int[N];
        dp[0] = maxValues[0];
        dp[1] = Math.max(maxValues[0], maxValues[1]);
        
        // Fill the dp array
        for (int i = 2; i < N; i++) {
            dp[i] = Math.max(dp[i-1], dp[i-2] + maxValues[i]);
        }
        
        return dp[N-1];
    }

    public boolean isCorrect(int[][] A, int output) {
        int expected = adjacent(A);
        return expected == output;
    }
}

