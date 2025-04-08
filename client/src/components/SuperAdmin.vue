<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-600">Total Users</h3>
                    <p class="text-4xl font-bold text-indigo-600 mt-2">{{ totalUsers }}</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-medium text-gray-600">Documents Generated</h3>
                    <p class="text-4xl font-bold text-indigo-600 mt-2">{{ totalDocs }}</p>
                </div>
            </div>

            <!-- Tab Navigation -->
            <div class="mb-6">
                <nav class="flex space-x-4">
                    <button @click="activeTab = 'users'" :class="[
                        'px-4 py-2 rounded-lg font-medium',
                        activeTab === 'users'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                    ]">
                        Users List
                    </button>
                    <button @click="activeTab = 'history'" :class="[
                        'px-4 py-2 rounded-lg font-medium',
                        activeTab === 'history'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                    ]">
                        Document History
                    </button>
                </nav>
            </div>

            <!-- Users List Tab -->
            <div v-if="activeTab === 'users'" class="bg-white rounded-lg shadow">
                <div class="p-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Users List</h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Join Date</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user._id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                        user.name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                        formatDate(user.createdAt) }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        <button @click="deleteUser(user._id)"
                                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- History Tab -->
            <div v-if="activeTab === 'history'" class="bg-white rounded-lg shadow">
                <div class="p-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Document Generation History</h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User Name
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Document Type
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
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {{ doc.userName }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ doc.userEmail }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ doc.documentType }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ formatDate(doc.createdAt) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                        <button @click="viewDocument(doc.documentUrl)"
                                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            View
                                        </button>
                                        <button @click="downloadDocument(doc.documentUrl)"
                                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
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

export default {
    name: 'Admin',
    data() {
        return {
            users: [
                {
                    _id: '1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    createdAt: '2024-04-01T10:00:00Z'
                },
                {
                    _id: '2',
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    createdAt: '2024-04-02T11:30:00Z'
                },
                {
                    _id: '3',
                    name: 'Mike Johnson',
                    email: 'mike@example.com',
                    createdAt: '2024-04-03T09:15:00Z'
                }
            ],
            totalUsers: 3,
            totalDocs: 5,
            documents: [
                {
                    _id: '1',
                    userName: 'John Doe',
                    userEmail: 'john@example.com',
                    documentType: 'Resume',
                    documentUrl: 'https://example.com/doc1.pdf',
                    createdAt: '2024-04-01T14:30:00Z'
                },
                {
                    _id: '2',
                    userName: 'Jane Smith',
                    userEmail: 'jane@example.com',
                    documentType: 'Cover Letter',
                    documentUrl: 'https://example.com/doc2.pdf',
                    createdAt: '2024-04-02T16:45:00Z'
                },
                {
                    _id: '3',
                    userName: 'Mike Johnson',
                    userEmail: 'mike@example.com',
                    documentType: 'Resume',
                    documentUrl: 'https://example.com/doc3.pdf',
                    createdAt: '2024-04-03T12:20:00Z'
                },
                {
                    _id: '4',
                    userName: 'John Doe',
                    userEmail: 'john@example.com',
                    documentType: 'CV',
                    documentUrl: 'https://example.com/doc4.pdf',
                    createdAt: '2024-04-04T10:10:00Z'
                },
                {
                    _id: '5',
                    userName: 'Jane Smith',
                    userEmail: 'jane@example.com',
                    documentType: 'Resume',
                    documentUrl: 'https://example.com/doc5.pdf',
                    createdAt: '2024-04-05T15:55:00Z'
                }
            ],
            activeTab: 'users'
        }
    },
    methods: {
        // Comment out or remove the axios calls temporarily to use dummy data
        async fetchStats() {
            // Dummy data already set in data()
            /*try {
                const response = await axios.get('http://localhost:5000/api/admin/stats');
                this.totalUsers = response.data.totalUsers;
                this.totalDocs = response.data.totalDocs;
            } catch (error) {
                console.error('Error fetching stats:', error);
            }*/
        },
        async fetchUsers() {
            // Dummy data already set in data()
            /*try {
                const response = await axios.get('http://localhost:5000/api/admin/users');
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }*/
        },
        async fetchDocuments() {
            // Dummy data already set in data()
            /*try {
                const response = await axios.get('http://localhost:5000/api/documents/history');
                this.documents = response.data;
            } catch (error) {
                console.error('Error fetching documents:', error);
            }*/
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
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        }
    },
    mounted() {
        this.fetchStats();
        this.fetchUsers();
        this.fetchDocuments();
    }
}
</script>