<template>
    <div class="min-h-screen bg-[#f0f7ff]">
        <!-- Add margin-top to account for navbar height -->
        <div class="pt-20 px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto">
                <!-- Simplified Header -->
                <div class="text-center mb-6">
                    <h2 class="text-2xl font-medium text-gray-800">
                        <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            Activity Documentation
                        </span>
                    </h2>
                    <div class="h-0.5 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mt-2">
                    </div>
                </div>

                <!-- Main Form Card -->
                <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <form @submit.prevent="handleSubmit" class="space-y-6">
                        <!-- Title Section -->
                        <div class="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
                            <label for="title" class="block text-base font-medium text-gray-700 mb-2">
                                Activity Title
                            </label>
                            <input type="text" id="title" v-model="formData.title" required class="w-full text-base font-normal px-4 py-2 rounded-lg border-2 border-gray-200 
                                focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300
                                placeholder-gray-400" placeholder="Enter a descriptive title for your activity...">
                        </div>

                        <!-- Date and Department -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <input type="date" v-model="formData.date" required
                                    class="w-full text-base font-normal px-4 py-2 rounded-lg border-2 border-gray-200 
                                    focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300">
                            </div>

                            <div class="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
                                <label
                                    class="block text-base font-semibold text-gray-700 mb-2">Department/Club/Cell</label>
                                <input type="text" v-model="formData.department" required
                                    class="w-full text-base font-medium px-4 py-2 rounded-lg border-2 border-gray-200 
                                    focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300">
                            </div>
                        </div>

                        <!-- Styled number inputs -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
                                <label class="block text-base font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-users text-blue-500 mr-2"></i>Student Participants
                                </label>
                                <input type="number" v-model="formData.studentCount" min="0" required
                                    class="w-full text-base font-medium px-4 py-2 rounded-lg border-2 border-gray-200 
                                    focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300">
                            </div>

                            <div class="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
                                <label class="block text-base font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-chalkboard-teacher text-blue-500 mr-2"></i>Faculty Participants
                                </label>
                                <input type="number" v-model="formData.facultyCount" min="0" required
                                    class="w-full text-base font-medium px-4 py-2 rounded-lg border-2 border-gray-200 
                                    focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300">
                            </div>
                        </div>

                        <!-- Mode Selection -->
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Mode of Activity</label>
                            <div class="flex space-x-4">
                                <button type="button" @click="formData.mode = 'online'" :class="[
                                    'flex-1 py-2 px-4 text-base font-normal rounded-lg transition-all duration-300',
                                    formData.mode === 'online'
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-500'
                                ]">
                                    <i class="fas fa-globe mr-2"></i>Online
                                </button>
                                <button type="button" @click="formData.mode = 'offline'" :class="[
                                    'flex-1 py-2 px-4 text-base font-normal rounded-lg transition-all duration-300',
                                    formData.mode === 'offline'
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-500'
                                ]">
                                    <i class="fas fa-building mr-2"></i>Offline
                                </button>
                                <button type="button" @click="formData.mode = 'hybrid'" :class="[
                                    'flex-1 py-2 px-4 text-base font-normal rounded-lg transition-all duration-300',
                                    formData.mode === 'hybrid'
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-500'
                                ]">
                                    <i class="fas fa-laptop-house mr-2"></i>Hybrid
                                </button>
                            </div>
                        </div>

                        <!-- Textareas with modern styling -->
                        <div class="space-y-4">
                            <div v-for="(field, index) in textAreas" :key="index"
                                class="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
                                <label :for="field.id" class="block text-sm font-medium text-gray-700 mb-2">
                                    <i :class="field.icon + ' text-blue-500 mr-2'"></i>{{ field.label }}
                                </label>
                                <textarea :id="field.id" v-model="formData[field.id]" rows="3" required class="w-full text-base font-normal px-4 py-2 rounded-lg border-2 border-gray-200 
                                    focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300"
                                    :placeholder="field.placeholder"></textarea>
                            </div>
                        </div>

                        <!-- File Upload Sections with Preview -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div v-for="(upload, index) in fileUploads" :key="index" class="relative group bg-gray-50 p-5 rounded-xl border-2 border-dashed border-gray-200 
                                hover:border-blue-500 transition-all duration-300 shadow-sm">
                                <label :for="upload.id"
                                    class="flex items-center text-base font-medium text-gray-700 mb-2">
                                    <i :class="[upload.icon, 'text-blue-500 mr-3']"></i>
                                    {{ upload.label }}
                                </label>

                                <!-- File Input and Preview -->
                                <div class="space-y-2">
                                    <input type="file" :id="upload.id" :ref="el => upload.ref = el"
                                        @change="(e) => handleFileUpload(e, upload.id)" :accept="upload.accept"
                                        :multiple="upload.multiple" class="hidden">

                                    <!-- Upload Button -->
                                    <button type="button" @click="triggerFileInput(upload.id)" class="w-full py-2 px-4 rounded-lg bg-white border-2 border-gray-200 
                                        hover:border-blue-500 hover:bg-blue-50 transition-all duration-300
                                        flex items-center justify-center text-gray-700 font-medium">
                                        <i class="fas fa-cloud-upload-alt mr-2 text-blue-500"></i>
                                        Choose Files
                                    </button>

                                    <!-- File Preview -->
                                    <div v-if="getUploadPreview(upload.id).length > 0" class="flex flex-wrap gap-2">
                                        <div v-for="(file, fIndex) in getUploadPreview(upload.id)" :key="fIndex"
                                            class="relative group">
                                            <img v-if="file.preview" :src="file.preview"
                                                class="w-16 h-16 object-cover rounded-lg border border-gray-200">
                                            <button @click="removeFile(upload.id, fIndex)" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <p class="text-xs text-gray-500">{{ upload.hint }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="mt-6">
                            <button type="submit" class="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
                                text-white text-base font-medium hover:from-blue-700 hover:to-indigo-700 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                                transition-all duration-300 transform hover:scale-[1.01]">
                                <i class="fas fa-paper-plane mr-2"></i>Submit Documentation
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

export default {
    name: 'DocForm',
    setup() {
        const authStore = useAuthStore();
        const formData = ref({
            title: 'Annual Technical Symposium 2024',
            date: '2024-03-15',
            department: 'Computer Science Department',
            studentCount: 150,
            facultyCount: 10,
            mode: 'online',
            report: 'The Annual Technical Symposium was a grand success with participation from various departments. The event featured keynote speeches, technical paper presentations, and hands-on workshops. Students showcased their innovative projects and research work.',
            feedback: 'Participants found the event highly informative and engaging. The workshops were particularly well-received, with many students requesting more such hands-on sessions in the future. The organization and execution were praised by both students and faculty.',
            outcome: 'The symposium successfully achieved its objectives of promoting technical knowledge sharing and fostering innovation. Several students formed new research collaborations, and many expressed interest in pursuing further research in their respective fields.',
            brochure: [],
            photos: [],
            participantsText: 'John Doe, Jane Smith, Robert Johnson, Sarah Williams, Michael Brown, Emily Davis, David Wilson, Jennifer Taylor, Thomas Anderson, Lisa Martinez',
            participantsFile: null,
            certificates: []
        });

        const textAreas = ref([
            {
                id: 'report',
                label: 'Activity Report',
                icon: 'fas fa-file-alt',
                placeholder: 'Describe the activity in detail...'
            },
            {
                id: 'feedback',
                label: 'Feedback Received',
                icon: 'fas fa-comments',
                placeholder: 'Enter participant feedback...'
            },
            {
                id: 'outcome',
                label: 'Programme Outcome',
                icon: 'fas fa-chart-line',
                placeholder: 'Describe the outcomes achieved...'
            }
        ]);

        const filePreview = ref({
            brochure: [],
            photos: [],
            participants: [],
            certificates: []
        });

        const fileUploads = ref([
            {
                id: 'brochure',
                label: 'Brochure Images',
                icon: 'fas fa-file-image',
                accept: 'image/*',
                hint: 'Maximum 2 images allowed',
                multiple: true,
                maxFiles: 2
            },
            {
                id: 'photos',
                label: 'Event Photographs',
                icon: 'fas fa-camera',
                accept: 'image/*',
                hint: 'Maximum 3 images allowed',
                multiple: true,
                maxFiles: 3
            },
            {
                id: 'participants',
                label: 'Participants List',
                icon: 'fas fa-users',
                accept: 'image/*',
                hint: 'Maximum 10 images allowed',
                multiple: true,
                maxFiles: 10
            },
            {
                id: 'certificates',
                label: 'Certificates (Optional)',
                icon: 'fas fa-certificate',
                accept: 'image/*',
                hint: 'Upload certificates if available',
                multiple: true,
                maxFiles: 10,
                required: false
            }
        ]);

        const uploadFile = async (file, uploadId) => {
            try {
                console.log('Starting file upload process for:', file.name);

                // Get presigned URL from backend
                console.log('Requesting presigned URL...');
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/upload-image/presigned-url`,
                    { fileName: file.name },
                    {
                        headers: {
                            Authorization: `Bearer ${authStore.token}`
                        }
                    }
                );

                console.log('Presigned URL response:', response.data);
                const { url, key, contentType } = response.data;

                // Upload file to R2 using presigned URL
                console.log('Uploading file to R2...');
                const uploadResponse = await fetch(url, {
                    method: 'PUT',
                    body: file,
                    headers: {
                        'Content-Type': contentType || file.type,
                        'x-amz-acl': 'public-read'
                    }
                });

                if (!uploadResponse.ok) {
                    const errorText = await uploadResponse.text();
                    console.error('Upload failed with response:', {
                        status: uploadResponse.status,
                        statusText: uploadResponse.statusText,
                        headers: Object.fromEntries(uploadResponse.headers.entries()),
                        errorText
                    });
                    throw new Error(`Upload failed: ${uploadResponse.status} ${errorText}`);
                }

                console.log('File uploaded successfully');

                // Store the key in formData
                if (!formData.value[uploadId]) {
                    formData.value[uploadId] = [];
                }
                formData.value[uploadId].push({
                    key,
                    name: file.name,
                    type: contentType || file.type
                });

                // Create preview
                const preview = URL.createObjectURL(file);
                filePreview.value[uploadId].push({
                    preview,
                    name: file.name
                });

                return true;
            } catch (error) {
                console.error('Upload error details:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
                alert(`Failed to upload ${file.name}: ${error.message}`);
                return false;
            }
        };

        const handleFileUpload = async (event, uploadId) => {
            const files = Array.from(event.target.files);
            const upload = fileUploads.value.find(u => u.id === uploadId);

            if (!files.length) return;

            if (files.length > upload.maxFiles) {
                alert(`Maximum ${upload.maxFiles} file(s) allowed`);
                event.target.value = '';
                return;
            }

            // Upload each file
            for (const file of files) {
                const success = await uploadFile(file, uploadId);
                if (!success) {
                    alert(`Failed to upload ${file.name}`);
                }
            }

            // Reset input
            event.target.value = '';
        };

        const removeFile = async (uploadId, index) => {
            // Cleanup preview URL
            URL.revokeObjectURL(filePreview.value[uploadId][index].preview);

            // Remove file from preview and formData
            filePreview.value[uploadId].splice(index, 1);
            formData.value[uploadId].splice(index, 1);
        };

        const getUploadPreview = (uploadId) => {
            return filePreview.value[uploadId] || [];
        };

        const triggerFileInput = (uploadId) => {
            const upload = fileUploads.value.find(u => u.id === uploadId);
            if (upload && upload.ref) {
                upload.ref.click();
            }
        };

        const handleSubmit = async () => {
            try {
                // Here you can submit the formData which now contains the R2 keys
                console.log('Form data with R2 keys:', formData.value);
                // Add your form submission logic here
            } catch (error) {
                console.error('Submit error:', error);
            }
        };

        return {
            formData,
            textAreas,
            fileUploads,
            filePreview,
            handleFileUpload,
            removeFile,
            getUploadPreview,
            triggerFileInput,
            handleSubmit
        };
    }
}
</script>