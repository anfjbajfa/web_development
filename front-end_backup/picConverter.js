import sharp from "sharp";
import path from "path";
import fs from "fs";

let parentFolder = "./public";
parentFolder = path.resolve(parentFolder);
let fileArr = [];

// 同步遍历文件夹
function getAllFiles(parentFolder, fileArr) {
  let entries = fs.readdirSync(parentFolder);
  entries.forEach((entry) => {
    // 构造完整路径
    const fullPath = path.join(parentFolder, entry);
    try {
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        // 递归获取子目录中的文件
        getAllFiles(fullPath, fileArr);
      } else {
        const ext = path.extname(fullPath).toLowerCase();
        if (ext === ".webp" || ext === ".webp") {
          fileArr.push(fullPath);
        }
      }
    } catch (err) {
      console.log(`file有问题: ${err}`);
    }
  });
  return fileArr;
}

getAllFiles(parentFolder, fileArr).forEach((entry) => {
  // 解析原文件路径
  const parsed = path.parse(entry);
  // 构造新的输出路径，保留目录和文件名，但扩展名改为 .webp
  const output = path.join(parsed.dir, `${parsed.name}.webp`);

  sharp(entry)
    .toFormat("webp")
    .toFile(output)
    .then((info) => {
      console.log("转换成功", info);
      // 删除原始文件
      fs.unlink(entry, (err) => {
        if (err) {
          console.error("删除原文件错误", err);
        } else {
          console.log("原文件已删除", entry);
        }
      });
    })
    .catch((err) => console.error("转换错误", err));
});
