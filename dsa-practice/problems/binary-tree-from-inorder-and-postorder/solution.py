# Definition for a  binary tree node
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    # @param A : list of integers (inorder)
    # @param B : list of integers (postorder)
    # @return the root node in the tree
    def buildTree(self, A, B):
        hm = {}
        for i in range(len(A)):
            hm[A[i]] = i

        def bt(ins, ine, ps, pe):
            if ins > ine or ps > pe:
                return None
            root = TreeNode(B[pe])
            rootidx = hm[B[pe]]
            length = rootidx - ins
            root.left = bt(ins, rootidx - 1, ps, ps + length - 1)
            root.right = bt(rootidx + 1, ine, ps + length, pe - 1)
            return root

        return bt(0, len(A) - 1, 0, len(B) - 1)
