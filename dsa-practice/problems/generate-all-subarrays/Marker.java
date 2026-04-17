import java.util.*;
class Marker {
    // Generate all subarrays of the array
    public List<List<Integer>> solve(int[] A) {
        int n = A.length;
        List<List<Integer>> ans = new ArrayList<>();
        
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                List<Integer> cur = new ArrayList<>();
                for (int k = i; k <= j; k++) {
                    cur.add(A[k]);
                }
                ans.add(cur);
            }
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, List<List<Integer>> output) {
        List<List<Integer>> expected = solve(A);
        
        // Sort both lists for comparison (order doesn't matter)
        expected.sort((a, b) -> {
            int cmp = Integer.compare(a.size(), b.size());
            if (cmp != 0) return cmp;
            for (int i = 0; i < a.size(); i++) {
                cmp = Integer.compare(a.get(i), b.get(i));
                if (cmp != 0) return cmp;
            }
            return 0;
        });
        
        List<List<Integer>> sortedOutput = new ArrayList<>(output);
        sortedOutput.sort((a, b) -> {
            int cmp = Integer.compare(a.size(), b.size());
            if (cmp != 0) return cmp;
            for (int i = 0; i < a.size(); i++) {
                cmp = Integer.compare(a.get(i), b.get(i));
                if (cmp != 0) return cmp;
            }
            return 0;
        });
        
        if (expected.size() != sortedOutput.size()) {
            return false;
        }
        
        for (int i = 0; i < expected.size(); i++) {
            List<Integer> exp = expected.get(i);
            List<Integer> out = sortedOutput.get(i);
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

