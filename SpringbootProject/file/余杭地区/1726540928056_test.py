import torch

print(torch.cuda.is_available())
print(torch.cuda.device_count())

if torch.cuda.is_available():
    device = torch.device("cuda")  # 使用第一块GPU
    props = torch.cuda.get_device_properties(device)

    total_memory = props.total_memory  # 获取总显存
    print(f"总显存: {total_memory / (1024 ** 2)} MB")
else:
    print("CUDA 不可用")