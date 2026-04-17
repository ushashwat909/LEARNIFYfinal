import java.util.*;
class Marker {
    // Find minimum cost to remove all elements
    public int solve(int[] A) {
        // Sort array in descending order
        Arrays.sort(A);
        // Reverse to get descending order
        for (int i = 0; i < A.length / 2; i++) {
            int temp = A[i];
            A[i] = A[A.length - 1 - i];
            A[A.length - 1 - i] = temp;
        }
        
        int cost = 0;
        for (int i = 0; i < A.length; i++) {
            // Element at position i contributes A[i] * (i+1) to cost
            cost += A[i] * (i + 1);
        }
        
        return cost;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

