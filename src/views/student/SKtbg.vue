<template>
    <div>
        <a-card style="margin-top: 24px" :bordered="false" title="开题报告">
            <a-descriptions bordered>
                <a-descriptions-item label="姓名">{{ studentName }}</a-descriptions-item>
                <a-descriptions-item label="学号">{{ studentData.studentId }}</a-descriptions-item>
                <a-descriptions-item label="班级">{{ className }}</a-descriptions-item>
                <a-descriptions-item label="选题">{{ projectName }}</a-descriptions-item>
            </a-descriptions>
        </a-card>
        <a-card :bordered="false">
            <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true" @change="handleChange"
                @drop="handleDrop">
                <p class="ant-upload-drag-icon">
                </p>
                <p class="ant-upload-text">上传文件</p>
                <p class="ant-upload-hint">

                </p>
            </a-upload-dragger>
        </a-card>
    </div>
</template>

<script>
import ref from 'vue';
import {
    requestCurrentStudentData,
    requestStudentByUserId,
    requestClassName,
} from "@/api/student.js";
import { requestProjectById } from "@/api/project.js";
import { message } from 'ant-design-vue';
export default {
    name: "SKtbg",
    data() {
        return {
            studentData: [],
            studentName: this.$store.state.userInfo.userName,
            projectName: "",
            className: "",
            temp: "",
            column1: "",
            column2: "",
            form: this.$form.createForm(this),
            uploading: false // 添加一个变量来跟踪文件是否正在上传
        };
    },
    created() {
        this.getStudentData();
    },

    setup() {
        return {
            handleChange,
            fileList: ref([]),
            handleDrop: e => {
                console.log(e);
            },
        };
    },

    methods: {
        async getStudentData() {
            const result = await requestCurrentStudentData();
            this.studentData = result.data.data;
            if (
                (this.studentData.projectId != null) &
                (this.studentData.projectId !== "")
            ) {
                requestProjectById(this.studentData.projectId).then(
                    (response) => {
                        this.projectName = response.data.data.projectName;
                    }
                );
            } else {
                this.projectName = "未选择选题";
            }
            const result2 = await requestClassName(this.studentData.studentId);
            this.className = result2.data.data;
        },
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log("Received values of form: ", values);
                }
            });
        },
        async handleChange(info) {
    const { file, fileList } = info; // 从 info 中提取 file 和 fileList 对象
    // 更新 fileList 状态
    this.fileList = fileList;

    if (!file || this.uploading) {
        return; // 如果 file 不存在或正在上传，直接返回
    }
    try {
        this.uploading = true; // 设置正在上传的状态为 true
        // 使用自定义上传插件上传文件
        const response = await this.$uploadFile(file.originFileObj);
        // 根据上传结果更新 fileList 或显示成功消息
        this.handleUploadSuccess(file, response);
    } catch (error) {
        // 处理上传失败
        this.handleUploadError(file, error);
    } finally {
        this.uploading = false; // 无论上传成功或失败，都要将正在上传的状态设为 false
    }
},
handleUploadSuccess(file, response) {
    // 更新文件状态为 'done'
    const newFileList = this.fileList.map(item => {
        if (item.uid === file.uid) {
            return {
                ...item,
                status: 'done',
                response: response, // 保存后端响应数据
            };
        }
        return item;
    });
    this.fileList = newFileList;

    // 显示成功消息
    message.success(`${file.name} 上传成功。`);
},
handleUploadError(file, error) {
    // 更新文件状态为 'error'
    const newFileList = this.fileList.map(item => {
        if (item.uid === file.uid) {
            return {
                ...item,
                status: 'error',
                response: error, // 保存错误信息
            };
        }
        return item;
    });
    this.fileList = newFileList;

    // 显示上传失败消息
    message.error(`${file.name} 上传失败。`);
    // 可以将错误信息记录到日志中
    console.error('上传错误:', error);
},

    },
};
</script>

<style scoped></style>
