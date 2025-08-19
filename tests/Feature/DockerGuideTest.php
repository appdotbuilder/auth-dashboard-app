<?php

test('docker guide can be accessed', function () {
    $response = $this->get('/docker-guide');

    $response->assertStatus(200);
    $response->assertSee('Docker Deployment Guide');
    $response->assertSee('Development Setup');
    $response->assertSee('Production Deployment');
});

test('docker guide contains docker configuration', function () {
    $response = $this->get('/docker-guide');

    $response->assertSee('docker-compose');
    $response->assertSee('Dockerfile');
    $response->assertSee('nginx');
    $response->assertSee('mysql');
});

test('docker guide includes testing information', function () {
    $response = $this->get('/docker-guide');

    $response->assertSee('php artisan test');
    $response->assertSee('Test Coverage');
    $response->assertSee('User authentication');
});