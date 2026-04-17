class Marker {
    // Count pairs (i, j) such that A[i] = 'A', A[j] = 'G' and i < j
    public long solve(String A) {
        long cntA = 0;
        long ans = 0;
        
        for (int i = 0; i < A.length(); i++) {
            if (A.charAt(i) == 'A') {
                cntA++;
            } else if (A.charAt(i) == 'G') {
                ans += cntA;
            }
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(String A, long output) {
        long expected = solve(A);
        return expected == output;
    }
}

