import request from "@/utils/request";

const ktbgApi = {
    GetByStudentId: "/ktbg/getByStudentId",
    Insert: "/ktbg/addktbg",
    Update: "/ktbg/update",
    Remove: "/ktbg/remove",
    GetById: "/ktbg/getById"
};


export function requestKtbg(param) {
    return request({
        url: ktbgApi.GetById,
        method: "get",
        params: { id: param }
    })
}

export function requestRemoveKtbg(param) {
    return request({
        url: ktbgApi.GetByStudentId,
        method: "get",
        data: { id: param }
    })
}

export function requestAddKtbg(parameter) {
    return request({
        url: ktbgApi.Insert,
        method: "post",
        data: parameter
    });
}
export function requestUpdateKtbg(parameter) {
    return request({
        url: ktbgApi.Update,
        method: "post",
        data: parameter
    });
}
export function requestGetKtbgByStudentId(param) {
    return request({
        url: ktbgApi.GetByStudentId,
        method: "get",
        params: { studentId: param }
    })
}
