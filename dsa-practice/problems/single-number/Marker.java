import java.util.*;
class Marker {
    // Returns the single number that appears once
    public int singleNumber(int[] A) {
        int ans = 0;
        for (int x : A) {
            ans ^= x;
        }
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = singleNumber(A);
        return expected == output;
    }
}





