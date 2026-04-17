import java.util.*;
class Marker {
    // Find the sum of maximum and minimum element in the array
    public int solve(int[] A) {
        if (A.length == 0) {
            return 0;
        }
        int max = A[0];
        int min = A[0];
        
        for (int i = 1; i < A.length; i++) {
            if (A[i] > max) {
                max = A[i];
            }
            if (A[i] < min) {
                min = A[i];
            }
        }
        
        return max + min;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}


