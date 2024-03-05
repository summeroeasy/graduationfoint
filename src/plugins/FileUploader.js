import request from "@/utils/request";

const FileUploader = {
  install(Vue, options) {
    // 插件方法
    Vue.prototype.$uploadFile = async function(file, uploadUrl = options.uploadUrl) {
      const formData = new FormData();
      formData.append('file', file); // 'file' 是后端接口指定的字段名

      try {
        const response = await request.post(uploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data; // 返回响应数据
      } catch (error) {
        throw error; // 抛出错误
      }
    };
  }
};

export default FileUploader;
