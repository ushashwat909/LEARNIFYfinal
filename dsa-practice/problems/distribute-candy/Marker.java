class Marker {
    public int candy(int[] A) {
        int n = A.length;
        if (n == 1) {
            return 1;
        }
        
        // Initialize candies for each child
        int[] candies = new int[n];
        for (int i = 0; i < n; i++) {
            candies[i] = 1;
        }
        
        // Left to right pass: ensure each child has more candies than the left neighbor if rating is higher
        for (int i = 1; i < n; i++) {
            if (A[i] > A[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }
        
        // Right to left pass: ensure each child has more candies than the right neighbor if rating is higher
        for (int i = n - 2; i >= 0; i--) {
            if (A[i] > A[i + 1]) {
                candies[i] = Math.max(candies[i], candies[i + 1] + 1);
            }
        }
        
        // Sum up the candies to get the minimum required total
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += candies[i];
        }
        
        return sum;
    }

    public boolean isCorrect(int[] A, int output) {
        int expected = candy(A);
        return expected == output;
    }
}

