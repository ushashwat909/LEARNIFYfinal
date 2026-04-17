import java.util.*;
class Marker {
    // Rotate matrix 90 degrees clockwise in place
    public List<List<Integer>> solve(int[][] A) {
        int n = A.length;
        
        // Step 1: Transpose the matrix (swap A[i][j] with A[j][i] for i < j)
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = A[i][j];
                A[i][j] = A[j][i];
                A[j][i] = temp;
            }
        }
        
        // Step 2: Reverse each row
        for (int i = 0; i < n; i++) {
            int l = 0;
            int r = n - 1;
            while (l < r) {
                int temp = A[i][l];
                A[i][l] = A[i][r];
                A[i][r] = temp;
                l++;
                r--;
            }
        }
        
        // Convert to List<List<Integer>> for return
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < n; j++) {
                row.add(A[i][j]);
            }
            result.add(row);
        }
        
        return result;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[][] A, List<List<Integer>> output) {
        // Create a copy of A to avoid modifying the original
        int n = A.length;
        int[][] A_copy = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                A_copy[i][j] = A[i][j];
            }
        }
        
        List<List<Integer>> expected = solve(A_copy);
        
        if (expected.size() != output.size()) {
            return false;
        }
        
        for (int i = 0; i < expected.size(); i++) {
            List<Integer> exp = expected.get(i);
            List<Integer> out = output.get(i);
            
            if (exp.size() != out.size()) {
                return false;
            }
            
            for (int j = 0; j < exp.size(); j++) {
                if (!exp.get(j).equals(out.get(j))) {
                    return false;
                }
            }
        }
        
        return true;
    }
}

