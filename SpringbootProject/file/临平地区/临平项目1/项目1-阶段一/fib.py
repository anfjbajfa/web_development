# def fib(n):
#     if n <= 0:
#         print(f"输入无效")
#         return None
        
#     # if n == 0:
#     #     return 0
#     elif n == 1:
#         return 1
#     elif n==2:
#         return 1
#     else:
#         return fib(n-1) + fib(n-2)

# print(fib(3))  
# """
# f(2)+f(1)= f(2)+f(0)+f(1)
# """
# print(fib(-1))  # 输出无效输入提示并返回None


def fib_iter(n):
    if n==0:
        return 1
    if n==1:
        return 1
    
    a = 1
    b = 1
    
    for i in range(2, n+1):
        a = b, 
        b = a + b
    return b

print(fib_iter(3))      
"""
value 1,1,2,3,5

index 0 1 2 3 4
"""