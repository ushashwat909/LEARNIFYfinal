class Marker {
    // Check if there exists a subset with sum equal to B using backtracking
    public int SubsetSum(int[] A, int B) {
        return backtrack(A, 0, 0, B);
    }
    
    private int backtrack(int[] A, int index, long currentSum, int target) {
        // Base case: found a subset with sum equal to target
        if (currentSum == target) {
            return 1;
        }
        
        // Base case: processed all elements
        if (index == A.length) {
            return 0;
        }
        
        // Try including A[index] in the subset
        int include = backtrack(A, index + 1, currentSum + A[index], target);
        if (include == 1) {
            return 1;
        }
        
        // Try excluding A[index] from the subset
        int exclude = backtrack(A, index + 1, currentSum, target);
        return exclude;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int output) {
        int expected = SubsetSum(A, B);
        return expected == output;
    }
}

