class Marker {
    // Find Bth smallest element using partial selection sort
    public int solve(int[] A, int B) {
        // Use partial selection sort - only sort first B elements
        for (int i = 0; i < B; i++) {
            int minIdx = i;
            // Find minimum element in remaining unsorted portion
            for (int j = i + 1; j < A.length; j++) {
                if (A[j] < A[minIdx]) {
                    minIdx = j;
                }
            }
            // Swap minimum element to position i
            int temp = A[minIdx];
            A[minIdx] = A[i];
            A[i] = temp;
        }
        
        // Bth smallest element is at position B-1
        return A[B - 1];
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int output) {
        // Create a copy to avoid modifying original array
        int[] A_copy = new int[A.length];
        for (int i = 0; i < A.length; i++) {
            A_copy[i] = A[i];
        }
        int expected = solve(A_copy, B);
        return expected == output;
    }
}

