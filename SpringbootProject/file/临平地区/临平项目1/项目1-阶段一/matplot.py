import torchvision.transforms as transforms
import torch
import matplotlib.pyplot as plt

# 创建 2x4 的子图网格
fig, axes = plt.subplots(2, 4)
# print(fig, axes.shape[0], axes.shape[1], axes)

# 图像路径
img_path = r"C:\Users\Yu FAN\Desktop\d46a5a08db5d9cf7957266369709782.png"
img = plt.imread(img_path)
print(type(img))

# 定义一个变换函数，应用图像变换
def apply(img):
    transform_pipeline = transforms.Compose([
        transforms.ToPILImage(),  # 需要先将 numpy 图像转换为 PIL 图像
        transforms.RandomHorizontalFlip(0.5),
        transforms.ToTensor()  # 将 PIL 图像重新转换为 tensor
    ])
    return transform_pipeline(img)  # 返回变换后的图像

# 遍历子图并显示
for i in range(axes.shape[0]):
    for j in range(axes.shape[1]):
        transformed_img = apply(torch.tensor(img).permute(2, 0, 1))  # 转换为 tensor 并 permute 通道顺序
        axes[i, j].imshow(transformed_img.permute(1, 2, 0))  # 将 tensor 转换回 numpy 格式并显示
        axes[i, j].axis('off')

# 显示所有子图
plt.show()
