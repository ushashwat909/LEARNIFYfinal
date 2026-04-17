import java.util.*;
class Marker {
    // Returns the maximum element of the array using recursion
    public int getMax(int[] A) {
        return findMax(A, 0);
    }
    
    private int findMax(int[] A, int idx) {
        if (idx == A.length) {
            return Integer.MIN_VALUE;
        }
        return Math.max(A[idx], findMax(A, idx + 1));
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = getMax(A);
        return expected == output;
    }
}





