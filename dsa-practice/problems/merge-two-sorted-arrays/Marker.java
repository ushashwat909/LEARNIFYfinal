import java.util.*;
class Marker {
    // Returns merged sorted array of A and B
    public int[] solve(int[] A, int[] B) {
        List<Integer> ans = new ArrayList<>();
        int i = 0;
        int j = 0;
        int n = A.length;
        int m = B.length;
        
        // Merge while both arrays have elements
        while (i < n && j < m) {
            if (A[i] < B[j]) {
                ans.add(A[i]);
                i++;
            } else {
                ans.add(B[j]);
                j++;
            }
        }
        
        // Add remaining elements from A
        while (i < n) {
            ans.add(A[i]);
            i++;
        }
        
        // Add remaining elements from B
        while (j < m) {
            ans.add(B[j]);
            j++;
        }
        
        // Convert List to array
        int[] result = new int[ans.size()];
        for (int k = 0; k < ans.size(); k++) {
            result[k] = ans.get(k);
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





