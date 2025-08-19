import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Welcome Section */}
                <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">👋</span>
                        <div>
                            <h1 className="text-2xl font-bold">Welcome back, {auth.user.name}!</h1>
                            <p className="text-blue-100">Here's your personal dashboard overview</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                                <span className="text-2xl">👤</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Account Status</p>
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">Active</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
                                <span className="text-2xl">🔐</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Security</p>
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">Secure</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard</p>
                                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">Ready</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="text-center">
                        <div className="mb-6 text-6xl">🎉</div>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                            Your Dashboard is Ready!
                        </h2>
                        <p className="mb-8 text-gray-600 dark:text-gray-300">
                            This is your protected dashboard area. Only authenticated users can access this page.
                        </p>
                        
                        {/* Feature Cards */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-lg border border-gray-200 p-6 text-left dark:border-gray-600">
                                <div className="mb-3 text-3xl">🔒</div>
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                                    Secure Access
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    This area is protected by authentication middleware
                                </p>
                            </div>

                            <div className="rounded-lg border border-gray-200 p-6 text-left dark:border-gray-600">
                                <div className="mb-3 text-3xl">📱</div>
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                                    Responsive Design
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Works perfectly on all devices and screen sizes
                                </p>
                            </div>

                            <div className="rounded-lg border border-gray-200 p-6 text-left dark:border-gray-600">
                                <div className="mb-3 text-3xl">⚡</div>
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                                    Fast & Modern
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Built with Laravel, React, and Inertia.js
                                </p>
                            </div>
                        </div>

                        {/* User Info Section */}
                        <div className="mt-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                📋 Account Information
                            </h3>
                            <div className="grid gap-4 text-left sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Name
                                    </label>
                                    <p className="text-gray-900 dark:text-white">{auth.user.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Email
                                    </label>
                                    <p className="text-gray-900 dark:text-white">{auth.user.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Deployment Guide */}
                        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl">🐳</span>
                                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                                    Docker Deployment
                                </h3>
                            </div>
                            <p className="mb-4 text-blue-700 dark:text-blue-200">
                                Ready to deploy? Check out our comprehensive Docker guide for both development and production environments.
                            </p>
                            <a
                                href="/docker-guide"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                🚀 View Docker Guide
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}