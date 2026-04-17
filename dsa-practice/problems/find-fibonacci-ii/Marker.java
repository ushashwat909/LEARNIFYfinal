import java.util.*;
class Marker {
    // Returns the Ath Fibonacci number using recursion
    public int findAthFibonacci(int A) {
        if (A <= 1) {
            return A;
        }
        return findAthFibonacci(A - 1) + findAthFibonacci(A - 2);
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int output) {
        int expected = findAthFibonacci(A);
        return expected == output;
    }
}





