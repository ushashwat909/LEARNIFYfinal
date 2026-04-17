import java.util.*;
class Marker {
    // Find if there exists a noble integer (number of greater elements equals the number itself)
    public int solve(int[] A) {
        // Sort array in descending order
        Arrays.sort(A);
        int n = A.length;
        
        // Reverse to get descending order
        for (int i = 0; i < n / 2; i++) {
            int temp = A[i];
            A[i] = A[n - 1 - i];
            A[n - 1 - i] = temp;
        }
        
        // Special case: if first element is 0
        if (A[0] == 0) {
            return 1;
        }
        
        int greater = 0;
        for (int i = 1; i < n; i++) {
            // Update count of greater elements when we encounter a different value
            if (A[i] != A[i - 1]) {
                greater = i;
            }
            // Check if count of greater elements equals the current element
            if (greater == A[i]) {
                return 1;
            }
        }
        
        return -1;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

