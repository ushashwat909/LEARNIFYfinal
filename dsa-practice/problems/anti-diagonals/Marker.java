import java.util.*;
class Marker {
    // Return array of anti-diagonals
    public List<List<Integer>> solve(int[][] A) {
        List<List<Integer>> ans = new ArrayList<>();
        int n = A.length;
        
        // First part: anti-diagonals starting from top row
        for (int j = 0; j < n; j++) {
            List<Integer> currAnti = new ArrayList<>();
            int k = 0;
            int i = 0;
            int col = j;
            
            while (i < n && col >= 0) {
                currAnti.add(A[i][col]);
                k++;
                i++;
                col--;
            }
            
            // Fill remaining spaces with 0
            while (k < n) {
                currAnti.add(0);
                k++;
            }
            
            ans.add(currAnti);
        }
        
        // Second part: anti-diagonals starting from leftmost column (excluding first row)
        for (int i = 1; i < n; i++) {
            List<Integer> currAnti = new ArrayList<>();
            int k = 0;
            int row = i;
            int j = n - 1;
            
            while (row < n && j >= 0) {
                currAnti.add(A[row][j]);
                k++;
                row++;
                j--;
            }
            
            // Fill remaining spaces with 0
            while (k < n) {
                currAnti.add(0);
                k++;
            }
            
            ans.add(currAnti);
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

