<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Navbar -->
        <Navbar />

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto p-6 mt-16">
            <!-- Stats Card -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-medium text-gray-600">Total Documents Generated</h3>
                        <p class="text-4xl font-bold text-indigo-600 mt-2">{{ totalDocs }}</p>
                    </div>
                    <router-link to="/doc"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Generate New Document
                    </router-link>
                </div>
            </div>

            <!-- Documents List -->
            <div class="bg-white rounded-lg shadow">
                <div class="p-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">My Documents</h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Document Title
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Generated Date
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="doc in documents" :key="doc._id" class="hover:bg-gray-50">
                                    <td class="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {{ doc.documentType }}
                                    </td>
                                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                                        {{ formatDate(doc.createdAt) }}
                                    </td>
                                    <td class="px-6 py-6 whitespace-nowrap text-sm space-x-3">
                                        <button @click="viewDocument(doc.documentUrl)"
                                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View
                                        </button>
                                        <button @click="downloadDocument(doc.documentUrl)"
                                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';

export default {
    name: 'Admin',
    components: {
        Navbar
    },
    data() {
        return {
            documents: [
                {
                    _id: '1',
                    documentType: 'Annual Tech Fest Report 2024',
                    documentUrl: 'https://example.com/techfest.pdf',
                    createdAt: '2024-04-01T10:30:00Z'
                },
                {
                    _id: '2',
                    documentType: 'Sports Day Event Proposal',
                    documentUrl: 'https://example.com/sportsday.pdf',
                    createdAt: '2024-04-02T15:45:00Z'
                },
                {
                    _id: '3',
                    documentType: 'Cultural Festival Schedule',
                    documentUrl: 'https://example.com/culturalfest.pdf',
                    createdAt: '2024-04-03T09:20:00Z'
                },
                {
                    _id: '4',
                    documentType: 'College Newsletter March 2024',
                    documentUrl: 'https://example.com/newsletter.pdf',
                    createdAt: '2024-04-04T14:15:00Z'
                },
                {
                    _id: '5',
                    documentType: 'Alumni Meet Planning Document',
                    documentUrl: 'https://example.com/alumni.pdf',
                    createdAt: '2024-04-05T11:30:00Z'
                }
            ],
            totalDocs: 5
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
        viewDocument(url) {
            window.open(url, '_blank');
        },
        downloadDocument(url) {
            const link = document.createElement('a');
            link.href = url;
            link.download = '';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
</script>