class Marker {
    // Sum of all subarray sums using contribution technique
    public long solve(int[] A) {
        long ans = 0;
        int n = A.length;
        
        for (int i = 0; i < n; i++) {
            // Each element A[i] appears in (i+1) * (n-i) subarrays
            // (i+1) choices for starting index, (n-i) choices for ending index
            ans += (long)A[i] * (i + 1) * (n - i);
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, long output) {
        long expected = solve(A);
        return expected == output;
    }
}

