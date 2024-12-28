import service from '../utils/request.js'

/**
 * 用户上传登录信息
 * @param {payload} 
 * @returns promise
 */
function submitRequestForm(payload) {
    return service({
        url: "order/submitOrder",
        method: "post",
        data: payload,
        needAuthentication:true
    })
}


function getRequestForm(phone) {
    return service(
        {
            url: "order/getOrder",
            method: "post",
            data: phone,
            needAuthentication:true
        }
    )
}

function getAllOrders(){
    return service(
        {
            url:"order/getAllOrders",
            method:"get",
            needAuthentication:true
        }
    )
}

function getPendingCount(){
    return service(
        {
            url: "order/getPendingCount",
            method: "get",
            needAuthentication:true
        }
    )
}

function updateOrderStatus(orderId,newStatus){
    return service(
        {
            url: "order/updateOrderStatus",
            method: "post",
            data: {orderId,
                   newStatus},
            needAuthentication:true
        }
    )
}

export {submitRequestForm,getRequestForm,getPendingCount,updateOrderStatus,getAllOrders}