import java.util.*;
class Marker {
    // Returns an array of two integers that appear only once (in ascending order)
    public int[] solve(int[] A) {
        int xorall = 0;
        for (int x : A) {
            xorall ^= x;
        }
        int i = 0;
        for (i = 0; i < 32; i++) {
            if ((xorall & (1 << i)) != 0) {
                break;
            }
        }
        int ans1 = 0;
        int ans2 = 0;
        for (int x : A) {
            if ((x & (1 << i)) != 0) {
                ans1 ^= x;
            } else {
                ans2 ^= x;
            }
        }
        int[] finalAns = {ans1, ans2};
        Arrays.sort(finalAns);
        return finalAns;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int[] output) {
        int[] expected = solve(A);
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





