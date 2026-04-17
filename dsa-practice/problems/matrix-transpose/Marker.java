import java.util.*;
class Marker {
    // Return the transpose of matrix A
    public List<List<Integer>> solve(int[][] A) {
        int n = A.length;
        int m = A[0].length;
        
        // Create transpose matrix with dimensions swapped (m x n)
        List<List<Integer>> ans = new ArrayList<>();
        
        // For each column in original matrix, create a row in transpose
        for (int j = 0; j < m; j++) {
            List<Integer> current = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                current.add(A[i][j]);
            }
            ans.add(current);
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[][] A, List<List<Integer>> output) {
        List<List<Integer>> expected = solve(A);
        
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

