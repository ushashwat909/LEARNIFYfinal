class Marker {
    // Calculate trapped rain water using prefix and suffix maximum arrays
    public int solve(int[] A) {
        int n = A.length;
        
        // Left maximum array: l[i] = max height from index 0 to i
        int[] l = new int[n];
        l[0] = A[0];
        for (int i = 1; i < n; i++) {
            l[i] = Math.max(l[i - 1], A[i]);
        }
        
        // Right maximum array: r[i] = max height from index i to n-1
        int[] r = new int[n];
        r[n - 1] = A[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            r[i] = Math.max(r[i + 1], A[i]);
        }
        
        // Calculate trapped water
        int ans = 0;
        for (int i = 1; i < n - 1; i++) {
            // Water level is minimum of left max and right max
            int waterLevel = Math.min(l[i - 1], r[i + 1]);
            // Trapped water = water level - current height (if positive)
            if (waterLevel > A[i]) {
                ans += waterLevel - A[i];
            }
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

