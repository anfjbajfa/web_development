import service from '../utils/request.js'
// 获取文件列表
function listFiles() {
    return service({
        url: "/file/listFiles",
        method: "get",
    })
}

// // 打开文件
// function openFileAPI(filePath) {
//     return service({
//         url: 'file/open',
//         method: "get",
//         responseType: 'blob', // 以二进制流的形式接收数据
//     })
// }



// 下载单个文件或多个文件的统一 API
function downloadFileAPI(filePaths) {
    return service({
        url: `/file/download`, 
        method: "post",
        data:  filePaths, // 发送选中的文件路径列表
        responseType: 'blob', // 接收二进制流
    })
}

function uploadFileAPI(files, path, onProgress) {
    const formData = new FormData();
    
    if (Array.isArray(files)) {
      // 如果是多个文件，遍历并添加到 FormData
      files.forEach(file => {
        formData.append('files[]', file); // 根据服务器的要求调整键名，例如 'files[]' 或 'file'
      });
    } else {
      // 如果是单个文件，直接添加
      formData.append('file', files);
    }
  
    formData.append('path', path);
  
    return service({
      url: '/file/upload',
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.lengthComputable) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });
  }

// 删除文件
function deleteFileAPI(filePath) {
    return service({
        url: `/file/delete?path=${encodeURIComponent(filePath)}`,
        method: "post"
    })
}

function createDirectoryAPI(parentPath, folderName){
    console.log(parentPath,folderName)
    return service({
        url:"/file/createDirectory",
        method:"post",
        data:{
            parentPath: parentPath,
            folderName: folderName
        }
    }

    )
}

function moveFileAPI(sourcePaths, targetPath){
    
    return service(
        {
            url:"/file/moveFiles",
            method:"post",
            data:{
                sourcePaths:sourcePaths,
                targetPath:targetPath
            }
        }
    )
}

function renameFileAPI(sourcePath, targetPath){
  console.log(sourcePath,targetPath)
  return service({
    url:"/file/renameFile",
    method:"post",
    data:{
      sourcePath:sourcePath,
      targetPath:targetPath
    }
  })
}

export {
    listFiles,
    // openFileAPI,
    downloadFileAPI,
    uploadFileAPI,
    deleteFileAPI,
    createDirectoryAPI,
    moveFileAPI,
    renameFileAPI
}

