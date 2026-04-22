<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class StaffDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('staff/dashboard');
    }
}
