import request from "@/utils/request";
const teacherApi = {
    AddTeacher:"/teacher/addteacher",
    UpdateTeacher:"/teacher/update",
    RemoveTeacher:"/teacher/delete",
    GetTeacherByTeacherId: "/teacher/getTeacherByTeacherId",
    GetTeacherByUserId: "/teacher/getTeacherByUserId",
    GetTeacherList: "/teacher/getTeacherList",
    GetAllTeacherList: "/teacher/getAllTeacherList",
    GetAllTeacherData: "/teacher/getAllTeacherData",
    GetTeacherData: "/teacher/getTeacherData",
    GetNameByTeacherId: "/teacher/getNamebyteacherid"
};

export function requestAddTeacher(param){
    return request({
        url:teacherApi.AddTeacher,
        method:"post",
        data:param
    })
}

export  function requestUpdateTeacher(param){
    return request({
        url:teacherApi.UpdateTeacher,
        method:"post",
        data:param
    })
}

export function requestRemoveTeacher(param){
    return request({
        url:teacherApi.RemoveTeacher,
        method:"get",
        params:{teacherId:param}
    })
}

export function requestNameByTeacherId(parameter) {
    return request({
        url: teacherApi.GetNameByTeacherId,
        method: "get",
        params: { teacherId: parameter }
    });

}

export function requestTeacherData(paramter) {
    paramter.pageNum = paramter.pageNum - 1;
    return request({
        url: teacherApi.GetTeacherData,
        method: "post",
        data: paramter
    });
}

export function requestTeacherByTeacherId(param) {

    return request({
        url: teacherApi.GetTeacherByTeacherId,
        method: "get",
        params: { teacherId: param }
    });
}
export function requestTeacherByUserId(param) {
    return request({
        url: teacherApi.GetTeacherByUserId,
        method: "get",
        params: { userId: param }
    });
}
export function requestAllTeacherList() {
    return request({
        url: teacherApi.GetAllTeacherList,
        method: "get",
    });
}
export function requestAllTeacherData() {
    return request({
        url: teacherApi.GetAllTeacherData,
        method: "get",
    });
}
