<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('dashboard can be accessed by authenticated users', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard')
        ->has('auth.user')
        ->where('auth.user.name', $user->name)
        ->where('auth.user.email', $user->email)
    );
});

test('dashboard cannot be accessed by guests', function () {
    $response = $this->get('/dashboard');

    $response->assertRedirect('/login');
});

test('authenticated user information is available on dashboard', function () {
    $user = User::factory()->create([
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ]);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertInertia(fn ($page) => $page
        ->where('auth.user.name', 'John Doe')
        ->where('auth.user.email', 'john@example.com')
    );
});

test('welcome page shows different content for authenticated users', function () {
    $user = User::factory()->create(['name' => 'Jane Doe']);

    $response = $this->actingAs($user)->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('welcome')
        ->has('auth.user')
        ->where('auth.user.name', 'Jane Doe')
    );
});

test('welcome page shows login options for guests', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('welcome')
        ->where('auth.user', null)
    );
});