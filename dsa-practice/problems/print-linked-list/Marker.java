class Marker {
    // Print linked list in space separated manner
    // Returns string representation for testing purposes
    public String solve(ListNode A) {
        if (A == null) {
            return "";
        }
        
        StringBuilder sb = new StringBuilder();
        ListNode temp = A;
        
        while (temp != null) {
            sb.append(temp.val);
            sb.append(" ");
            temp = temp.next;
        }
        
        return sb.toString();
    }

    // Compare the output with expected result
    public boolean isCorrect(ListNode A, String output) {
        String expected = solve(A);
        return expected.equals(output);
    }
}





