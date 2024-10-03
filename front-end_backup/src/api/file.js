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


// 下载文件
function downloadFileAPI(filePath) {
    return service({
        url: `/file/download?filePath=${encodeURIComponent(filePath)}`,
        method: "get",
        responseType: 'blob', // 以二进制流的形式接收数据
    })
}

// 上传文件
function uploadFileAPI(file,path) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path',path)
    return service({
        url: "/file/upload",
        method: "post",
        data: formData,
    
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

export {
    listFiles,
    // openFileAPI,
    downloadFileAPI,
    uploadFileAPI,
    deleteFileAPI,
    createDirectoryAPI
}

