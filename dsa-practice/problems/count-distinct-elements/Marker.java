import java.util.*;
class Marker {
    // Returns the number of distinct elements in array A
    public int solve(int[] A) {
        Set<Integer> ans = new HashSet<>();
        for (int x : A) {
            ans.add(x);
        }
        return ans.size();
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}





