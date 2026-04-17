import java.util.*;
class Marker {
    // Generate all combinations of well-formed parentheses
    public List<String> generateParenthesis(int A) {
        List<String> ans = new ArrayList<>();
        StringBuilder cur = new StringBuilder();
        generateParenthesisHelper(0, 0, A, cur, ans);
        return ans;
    }
    
    private void generateParenthesisHelper(int open, int close, int n, StringBuilder cur, List<String> ans) {
        // Base case: both open and close counts reached n
        if (open == n && close == n) {
            ans.add(cur.toString());
            return;
        }
        
        // Add '(' if we haven't used all open parentheses
        if (open < n) {
            cur.append('(');
            generateParenthesisHelper(open + 1, close, n, cur, ans);
            cur.deleteCharAt(cur.length() - 1); // Backtrack
        }
        
        // Add ')' if we have more open than close (valid condition)
        if (close < open) {
            cur.append(')');
            generateParenthesisHelper(open, close + 1, n, cur, ans);
            cur.deleteCharAt(cur.length() - 1); // Backtrack
        }
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, List<String> output) {
        List<String> expected = generateParenthesis(A);
        
        // Sort both lists for comparison (since order might matter, but we'll sort to be safe)
        Collections.sort(expected);
        List<String> outputCopy = new ArrayList<>(output);
        Collections.sort(outputCopy);
        
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
}

