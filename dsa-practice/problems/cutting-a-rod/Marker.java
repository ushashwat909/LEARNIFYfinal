class Marker {
    public int solve(int[] A) {
        int N = A.length;
        
        // dp[L] = best price for rod length L
        int[] dp = new int[N + 1]; // dp[0] = 0 (base case)
        
        // Build up from length 1 to N
        for (int L = 1; L <= N; L++) {
            int best = 0;
            // Try all possible first cuts of length cut_len (1..L)
            for (int cutLen = 1; cutLen <= L; cutLen++) {
                int priceOfCut = A[cutLen - 1];
                int remainingLen = L - cutLen;
                int candidate = priceOfCut + dp[remainingLen];
                best = Math.max(best, candidate);
            }
            dp[L] = best;
        }
        
        return dp[N];
    }

    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

