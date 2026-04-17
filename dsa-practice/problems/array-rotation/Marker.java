import java.util.*;
class Marker {
    // Rotate array A to the right B times
    public int[] solve(int[] A, int B) {
        int n = A.length;
        B = B % n;
        
        // Helper function to reverse array from index i to j
        reverse(A, n - B, n - 1);
        reverse(A, 0, n - B - 1);
        reverse(A, 0, n - 1);
        
        return A;
    }
    
    private void reverse(int[] A, int i, int j) {
        while (i < j) {
            int temp = A[i];
            A[i] = A[j];
            A[j] = temp;
            i++;
            j--;
        }
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int[] output) {
        int[] expected = solve(A.clone(), B);
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


