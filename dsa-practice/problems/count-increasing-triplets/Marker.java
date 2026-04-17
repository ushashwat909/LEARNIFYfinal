class Marker {
    // Count increasing triplets using three pointers approach
    public int solve(int[] A) {
        int n = A.length;
        int ans = 0;
        
        // For each middle element at index i
        for (int i = 1; i < n - 1; i++) {
            // Count elements on left that are smaller than A[i]
            int l = 0;
            int j = i - 1;
            while (j >= 0) {
                if (A[j] < A[i]) {
                    l++;
                }
                j--;
            }
            
            // Count elements on right that are larger than A[i]
            int r = 0;
            j = i + 1;
            while (j < n) {
                if (A[j] > A[i]) {
                    r++;
                }
                j++;
            }
            
            // Number of triplets with A[i] as middle = l * r
            ans += (l * r);
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

