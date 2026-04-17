import java.util.*;
class Marker {
    // Returns the factorial of A using recursion
    public int solve(int A) {
        if (A == 0) {
            return 1;
        }
        return solve(A - 1) * A;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}





