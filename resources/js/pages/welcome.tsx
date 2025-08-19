import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:border-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                🏠 Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                >
                                    🔐 Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    🚀 Get Started
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-6xl lg:flex-row lg:items-center lg:gap-12">
                        {/* Content Section */}
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-8 pb-12 text-center shadow-xl lg:rounded-2xl lg:p-12 lg:text-left dark:bg-gray-800 dark:shadow-2xl">
                            <div className="mb-6">
                                <h1 className="mb-4 text-4xl font-bold leading-tight lg:text-5xl">
                                    🔐 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Secure</span> Web Application
                                </h1>
                                <p className="mb-8 text-lg text-gray-600 lg:text-xl dark:text-gray-300">
                                    A modern web application with complete user authentication, 
                                    secure dashboard access, and professional testing capabilities.
                                </p>
                            </div>

                            {/* Features Grid */}
                            <div className="mb-8 grid gap-4 text-left sm:grid-cols-2">
                                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                    <div className="mb-2 text-2xl">🛡️</div>
                                    <h3 className="mb-1 font-semibold text-blue-900 dark:text-blue-100">Secure Authentication</h3>
                                    <p className="text-sm text-blue-700 dark:text-blue-200">Complete login/register system with email verification</p>
                                </div>
                                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                                    <div className="mb-2 text-2xl">📊</div>
                                    <h3 className="mb-1 font-semibold text-green-900 dark:text-green-100">Personal Dashboard</h3>
                                    <p className="text-sm text-green-700 dark:text-green-200">Protected dashboard area for authenticated users</p>
                                </div>
                                <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                                    <div className="mb-2 text-2xl">🧪</div>
                                    <h3 className="mb-1 font-semibold text-purple-900 dark:text-purple-100">Fully Tested</h3>
                                    <p className="text-sm text-purple-700 dark:text-purple-200">Comprehensive test suite for reliability</p>
                                </div>
                                <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
                                    <div className="mb-2 text-2xl">🐳</div>
                                    <h3 className="mb-1 font-semibold text-orange-900 dark:text-orange-100">Docker Ready</h3>
                                    <p className="text-sm text-orange-700 dark:text-orange-200">Easy deployment for dev and production</p>
                                </div>
                            </div>

                            {/* CTA Section */}
                            {!auth.user && (
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-base font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
                                        >
                                            🚀 Create Account
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center rounded-lg border-2 border-blue-600 px-8 py-3 text-base font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900"
                                        >
                                            🔐 Sign In
                                        </Link>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        ✨ Join now and access your secure dashboard
                                    </p>
                                </div>
                            )}

                            {auth.user && (
                                <div className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-6 dark:from-green-900/20 dark:to-blue-900/20">
                                    <div className="mb-3 text-3xl">👋</div>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                        Welcome back, {auth.user.name}!
                                    </h3>
                                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                                        You're logged in and ready to go. Access your dashboard to get started.
                                    </p>
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
                                    >
                                        🏠 Go to Dashboard
                                    </Link>
                                </div>
                            )}

                            <footer className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                <div className="flex items-center justify-center gap-2 lg:justify-start">
                                    <span>Built with</span>
                                    <span className="text-red-500">❤️</span>
                                    <span>using Laravel + React + Inertia.js</span>
                                </div>
                            </footer>
                        </div>

                        {/* Visual Section */}
                        <div className="mb-8 flex-1 lg:mb-0">
                            <div className="relative mx-auto max-w-md lg:max-w-none">
                                {/* Decorative elements */}
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-30 blur"></div>
                                <div className="relative rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
                                    <div className="mb-6 text-center text-6xl">🔐</div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Authentication System</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Protected Dashboard</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-300">User Session Management</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Email Verification</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}