class Marker {
    // Find majority element using Boyer-Moore majority vote algorithm
    public int solve(int[] A) {
        int cnt = 0;
        Integer candidate = null;
        
        // Boyer-Moore majority vote algorithm
        for (int i = 0; i < A.length; i++) {
            if (cnt == 0) {
                candidate = A[i];
                cnt = 1;
            } else if (A[i] == candidate) {
                cnt++;
            } else {
                cnt--;
            }
        }
        
        return candidate;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

