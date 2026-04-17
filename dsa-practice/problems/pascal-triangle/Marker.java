import java.util.*;
class Marker {
    // Generate Pascal's triangle up to A rows
    public List<List<Integer>> solve(int A) {
        List<List<Integer>> result = new ArrayList<>();
        
        for (int i = 0; i < A; i++) {
            List<Integer> row = new ArrayList<>();
            // Initialize row with zeros
            for (int j = 0; j < A; j++) {
                row.add(0);
            }
            // Fill in the first i+1 elements
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    row.set(j, 1);
                } else {
                    List<Integer> prevRow = result.get(i - 1);
                    row.set(j, prevRow.get(j - 1) + prevRow.get(j));
                }
            }
            result.add(row);
        }
        
        return result;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, List<List<Integer>> output) {
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

