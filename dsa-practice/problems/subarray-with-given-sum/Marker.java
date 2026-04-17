import java.util.*;
class Marker {
    // Find and return first continuous subarray which adds to B
    public int[] solve(int[] A, int B) {
        int n = A.length;
        int i = 0;
        int j = 0;
        long curSum = 0; // Use long to prevent overflow
        
        for (j = 0; j < n; j++) {
            curSum += A[j];
            
            // Shrink window from left if sum exceeds B
            while (curSum > B && i <= j) {
                curSum -= A[i];
                i++;
            }
            
            // If sum equals B, return the subarray
            if (curSum == B) {
                int[] result = new int[j - i + 1];
                for (int k = i; k <= j; k++) {
                    result[k - i] = A[k];
                }
                return result;
            }
        }
        
        // No subarray found
        return new int[]{-1};
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int[] output) {
        int[] expected = solve(A, B);
        if (expected.length != output.length) {
            return false;
        }
        for (int i = 0; i < expected.length; i++) {
            if (expected[i] != output[i]) {
                return false;
            }
        }
        return true;
    }
}

