import java.util.*;
class Marker {
    // Generate all possible subsets using backtracking
    public List<List<Integer>> subsets(int[] A) {
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> cur = new ArrayList<>();
        dfs(A, 0, cur, ans);
        return ans;
    }
    
    private void dfs(int[] A, int idx, List<Integer> cur, List<List<Integer>> ans) {
        // Base case: reached the end of array
        if (idx == A.length) {
            // Add a copy of current subset to result
            ans.add(new ArrayList<>(cur));
            return;
        }
        
        // Include A[idx] in the subset
        cur.add(A[idx]);
        dfs(A, idx + 1, cur, ans);
        
        // Exclude A[idx] from the subset (backtrack)
        cur.remove(cur.size() - 1);
        dfs(A, idx + 1, cur, ans);
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, List<List<Integer>> output) {
        List<List<Integer>> expected = subsets(A);
        
        // Sort both lists for comparison (since order doesn't matter)
        sortListOfLists(expected);
        List<List<Integer>> outputCopy = new ArrayList<>();
        for (List<Integer> list : output) {
            outputCopy.add(new ArrayList<>(list));
        }
        sortListOfLists(outputCopy);
        
        if (expected.size() != outputCopy.size()) {
            return false;
        }
        
        for (int i = 0; i < expected.size(); i++) {
            if (!expected.get(i).equals(outputCopy.get(i))) {
                return false;
            }
        }
        
        return true;
    }
    
    private void sortListOfLists(List<List<Integer>> list) {
        Collections.sort(list, (a, b) -> {
            for (int i = 0; i < Math.min(a.size(), b.size()); i++) {
                int cmp = Integer.compare(a.get(i), b.get(i));
                if (cmp != 0) return cmp;
            }
            return Integer.compare(a.size(), b.size());
        });
    }
}

