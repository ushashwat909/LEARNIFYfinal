import java.util.*;
class Marker {
    // Returns an array of all indices where B occurs in A
    public int[] allIndices(int[] A, int B) {
        List<Integer> result = new ArrayList<>();
        findAllIndices(A, B, 0, result);
        
        // Convert List to array
        int[] ans = new int[result.size()];
        for (int i = 0; i < result.size(); i++) {
            ans[i] = result.get(i);
        }
        return ans;
    }
    
    private void findAllIndices(int[] A, int B, int idx, List<Integer> result) {
        if (idx == A.length) {
            return;
        }
        if (A[idx] == B) {
            result.add(idx);
        }
        findAllIndices(A, B, idx + 1, result);
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int[] output) {
        int[] expected = allIndices(A, B);
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





