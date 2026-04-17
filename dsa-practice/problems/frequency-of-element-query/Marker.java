import java.util.*;
class Marker {
    // Returns an array containing the frequency of each element in B as found in A
    public int[] solve(int[] A, int[] B) {
        Map<Integer, Integer> hm = new HashMap<>();
        
        // Count frequency of each element in A
        for (int i = 0; i < A.length; i++) {
            hm.put(A[i], hm.getOrDefault(A[i], 0) + 1);
        }
        
        // Get frequencies for each query in B
        int[] result = new int[B.length];
        for (int i = 0; i < B.length; i++) {
            result[i] = hm.getOrDefault(B[i], 0);
        }
        
        return result;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int[] B, int[] output) {
        int[] expected = solve(A, B);
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





