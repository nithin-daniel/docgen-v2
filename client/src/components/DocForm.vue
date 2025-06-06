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

        <!-- Loading Overlay -->
        <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p class="text-gray-700">Generating documentation...</p>
            </div>
        </div>

        <!-- Response Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
            <!-- Backdrop with blur -->
            <div class="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

            <!-- Modal content -->
            <div class="relative bg-white/60 backdrop-blur-md p-6 rounded-lg shadow-xl max-w-4xl w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">Generated Documentation</h3>
                    <button @click="showModal = false" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Sections container with glass effect -->
                <div class="space-y-6 max-h-[70vh] overflow-y-auto bg-white/40 backdrop-blur-md p-4 rounded-lg">
                    <!-- Activity Report Section -->
                    <div class="bg-white/30 backdrop-blur-md rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="text-lg font-medium text-blue-600">
                                <i class="fas fa-file-alt mr-2"></i>Activity Report
                            </h4>
                            <button @click="regenerateSection('report')"
                                class="p-2 rounded-lg text-blue-600 hover:text-blue-800 transition-colors"
                                title="Retry Report">
                                <i class="fas fa-redo-alt"></i>
                            </button>
                        </div>
                        <div class="relative min-h-[100px]">
                            <div v-if="sectionResponses.report.loading"
                                class="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75">
                                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                            <p v-else class="text-gray-700 whitespace-pre-line">{{ sectionResponses.report.content }}
                            </p>
                        </div>
                    </div>

                    <!-- Feedback Section -->
                    <div class="bg-white/30 backdrop-blur-md rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="text-lg font-medium text-blue-600">
                                <i class="fas fa-comments mr-2"></i>Feedback Received
                            </h4>
                            <button @click="regenerateSection('feedback')"
                                class="p-2 rounded-lg text-blue-600 hover:text-blue-800 transition-colors"
                                title="Retry Feedback">
                                <i class="fas fa-redo-alt"></i>
                            </button>
                        </div>
                        <div class="relative min-h-[100px]">
                            <div v-if="sectionResponses.feedback.loading"
                                class="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75">
                                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                            <p v-else class="text-gray-700 whitespace-pre-line">{{ sectionResponses.feedback.content }}
                            </p>
                        </div>
                    </div>

                    <!-- Programme Outcome Section -->
                    <div class="bg-white/30 backdrop-blur-md rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="text-lg font-medium text-blue-600">
                                <i class="fas fa-chart-line mr-2"></i>Programme Outcome
                            </h4>
                            <button @click="regenerateSection('outcome')"
                                class="p-2 rounded-lg text-blue-600 hover:text-blue-800 transition-colors"
                                title="Retry Outcome">
                                <i class="fas fa-redo-alt"></i>
                            </button>
                        </div>
                        <div class="relative min-h-[100px]">
                            <div v-if="sectionResponses.outcome.loading"
                                class="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75">
                                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                            <p v-else class="text-gray-700 whitespace-pre-line">{{ sectionResponses.outcome.content }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="mt-6">
                    <button @click="saveDocument" :disabled="!isPerfectButtonEnabled" :class="[
                        'w-full py-2 px-4 rounded-lg transition-colors backdrop-blur-sm flex items-center justify-center gap-2',
                        isPerfectButtonEnabled
                            ? 'bg-green-600/80 hover:bg-green-700/90 text-white cursor-pointer'
                            : 'bg-gray-400/80 text-gray-200 cursor-not-allowed'
                    ]">
                        <i class="fas fa-check-circle"></i>
                        Perfect
                    </button>
                </div>
            </div>
        </div>

        <!-- Report Preview Modal -->
        <div v-if="showReport" class="fixed inset-0 z-50 flex items-center justify-center">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow-xl w-full max-w-6xl mx-4 h-[90vh] flex flex-col">
                <!-- Header -->
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="text-xl font-semibold text-gray-800">Generated Report</h3>
                    <div class="flex gap-2">
                        <a @click="downloadDocx()" download
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <i class="fas fa-download"></i>
                            Download
                        </a>
                        <button @click="showReport = false" class="text-gray-500 hover:text-gray-700 p-2">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <!-- iframe container -->
                <div class="flex-1 p-4">
                    <iframe :src="reportUrl" class="w-full h-full rounded-lg border border-gray-200"
                        frameborder="0"></iframe>
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
        // Add all refs at the beginning
        const isLoading = ref(false);
        const showModal = ref(false);
        const generatedResponse = ref('');
        const sectionResponses = ref({
            report: {
                content: `The Annual Technical Symposium 2024 was successfully conducted by the Computer Science Department on March 15, 2024. The event was conducted in online mode with active participation from 150 students and 10 faculty members.

Key Highlights:
• Technical paper presentations
• Interactive workshops
• Expert keynote speeches
• Project demonstrations
• Virtual networking sessions

The event successfully leveraged virtual conferencing tools to ensure seamless interaction and engagement.`,
                loading: false
            },
            feedback: {
                content: `Participant Feedback Summary:

• 95% participants rated the event organization as "Excellent"
• Most appreciated aspects:
  - Quality of technical presentations
  - Interactive workshop sessions
  - Expert speaker interactions

Suggestions received:
• Increase duration of Q&A sessions
• Include more hands-on workshops
• Add more industry expert sessions`,
                loading: false
            },
            outcome: {
                content: `Programme Outcomes:

1. Knowledge Transfer:
   • Enhanced technical knowledge
   • Exposure to latest technologies
   • Improved presentation skills

2. Networking Benefits:
   • 3 research collaborations formed
   • 5 internship opportunities
   • Industry connections established

3. Skill Development:
   • Virtual presentation experience
   • Technical writing improvement
   • Professional networking skills`,
                loading: false
            }
        });

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

        // Add new ref for button state
        const isPerfectButtonEnabled = ref(false);
        const reportUrl = ref('');
        const reportdocument = ref('');
        const showReport = ref(false);

        const generatePublicUrl = (key) => {
            return `https://${import.meta.env.VITE_R2_PUBLIC_URL}/${key}`;
        };

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

        // Update handleSubmit function to check all responses
        const handleSubmit = async () => {
            try {
                isLoading.value = true;
                showModal.value = true;
                sectionResponses.value.report.loading = true;
                sectionResponses.value.feedback.loading = true;
                sectionResponses.value.outcome.loading = true;
                isPerfectButtonEnabled.value = false; // Disable button initially

                const baseData = {
                    title: formData.value.title,
                    date: formData.value.date,
                    department: formData.value.department,
                    studentParticipants: formData.value.studentCount,
                    facultyParticipants: formData.value.facultyCount,
                    mode: formData.value.mode
                };

                // First generate all content
                try {
                    const sections = ['report', 'feedback', 'outcome'];
                    const responses = await Promise.all(
                        sections.map(section =>
                            axios.post(
                                `${import.meta.env.VITE_API_URL}/gemini/generate-${section}`,
                                {
                                    ...baseData,
                                    content: formData.value[section]
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${authStore.token}`
                                    }
                                }
                            )
                        )
                    );

                    // Check if all responses are successful
                    const allSuccessful = responses.every(response => response.status === 200);
                    isPerfectButtonEnabled.value = allSuccessful;

                    // Process responses and update sectionResponses
                    responses.forEach((response, index) => {
                        const section = sections[index];
                        if (response.data) {
                            sectionResponses.value[section].content = typeof response.data === 'string'
                                ? response.data
                                : response.data.text || '';
                        }
                    });

                } catch (error) {
                    isPerfectButtonEnabled.value = false;
                    console.error('Error generating content:', error);
                    alert('Failed to generate content. Please try again.');
                }
            } catch (error) {
                isPerfectButtonEnabled.value = false;
                console.error('Submit error:', error);
                alert('An error occurred while submitting the form');
            } finally {
                sectionResponses.value.report.loading = false;
                sectionResponses.value.feedback.loading = false;
                sectionResponses.value.outcome.loading = false;
                isLoading.value = false;
            }
        };

        // 1. Add new method for document saving
        const saveDocument = async () => {
            try {
                isLoading.value = true;
                // Get user from localStorage
                const users = JSON.parse(localStorage.getItem('authData'));

                const docData = {
                    title: formData.value.title,
                    date: formData.value.date,
                    department: formData.value.department,
                    studentCount: formData.value.studentCount,
                    facultyCount: formData.value.facultyCount,
                    mode: formData.value.mode,
                    report: sectionResponses.value.report.content,
                    feedback: sectionResponses.value.feedback.content,
                    outcome: sectionResponses.value.outcome.content,
                    brochure: formData.value.brochure?.map(file => `https://${import.meta.env.VITE_R2_PUBLIC_URL}/${file.key}`) || [],
                    photos: formData.value.photos?.map(file => `https://${import.meta.env.VITE_R2_PUBLIC_URL}/${file.key}`) || [],
                    participants: formData.value.participants?.map(file => `https://${import.meta.env.VITE_R2_PUBLIC_URL}/${file.key}`) || [],
                    certificates: formData.value.certificates?.map(file => `https://${import.meta.env.VITE_R2_PUBLIC_URL}/${file.key}`) || [],
                    // Add user ID to the request
                    user: users.user.id
                };

                const saveResponse = await axios.post(
                    `${import.meta.env.VITE_API_URL}/doc/create`,
                    docData,
                    {
                        headers: {
                            Authorization: `Bearer ${authStore.token}`
                        }
                    }
                );

                console.log('Document saved:', saveResponse.data);
                reportUrl.value = saveResponse.data.reportUrl;
                reportdocument.value = saveResponse.data.document._id;
                showReport.value = true;
                showModal.value = false;
            } catch (error) {
                console.error('Error saving document:', error);
                alert('Failed to save document. Please try again.');
            } finally {
                isLoading.value = false;
            }
        };

        // Update the regenerateSection function
        const regenerateSection = async (section) => {
            try {
                sectionResponses.value[section].loading = true;
                isPerfectButtonEnabled.value = false; // Disable button during regeneration

                const submissionData = {
                    title: formData.value.title,
                    date: formData.value.date,
                    department: formData.value.department,
                    studentParticipants: formData.value.studentCount,
                    facultyParticipants: formData.value.facultyCount,
                    mode: formData.value.mode,
                    // Use a common content field with the current section's content
                    content: formData.value[section],
                    type: "Make it more better"
                };

                const endpoint = `${import.meta.env.VITE_API_URL}/gemini/generate-${section}`;

                const response = await axios.post(
                    endpoint,
                    submissionData,
                    {
                        headers: {
                            Authorization: `Bearer ${authStore.token}`
                        }
                    }
                );

                if (response.status === 200 && response.data) {
                    sectionResponses.value[section].content = typeof response.data === 'string'
                        ? response.data
                        : response.data.text || '';

                    // Check if all sections have content
                    const allSectionsHaveContent = ['report', 'feedback', 'outcome'].every(
                        s => sectionResponses.value[s].content
                    );
                    isPerfectButtonEnabled.value = allSectionsHaveContent;
                } else {
                    throw new Error('No data received from server');
                }
            } catch (error) {
                isPerfectButtonEnabled.value = false;
                console.error(`Error regenerating ${section}:`, error);
                alert(`Failed to regenerate ${section}. Please try again.`);
            } finally {
                sectionResponses.value[section].loading = false;
            }
        };
        const downloadDocx = async () => {
            try {
                const task = ilovepdf.newTask('htmlpdf');

                task.start()
                    .then(() => {
                        return task.addFile('https://ilovepdf.com');
                    })
                    .then(() => {
                        return task.process();
                    })
                    .then(() => {
                        return task.download();
                    })
                    .then((data) => {
                        fs.writeFileSync('path/to/local/file_name.pdf', data);
                    });
            } catch (error) {
                console.error('Error downloading document:', error);
                alert('Failed to download document. Please try again.');
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
            handleSubmit,
            isLoading,
            showModal,
            generatedResponse,
            sectionResponses,
            regenerateSection,
            saveDocument,
            isPerfectButtonEnabled,
            reportUrl,
            showReport,
            reportdocument
        };
    }
}
</script>