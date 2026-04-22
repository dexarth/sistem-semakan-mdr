<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Premise;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PremiseSearchController extends Controller
{
    public function index(Request $request): Response
    {
        $premises = null;

        if ($request->filled('search')) {
            $premises = Premise::with('category')
                ->search($request->search)
                ->where('status', 'active')
                ->latest()
                ->paginate(15)
                ->withQueryString();
        }

        return Inertia::render('staff/premises/search', [
            'premises' => $premises,
            'filters' => $request->only('search'),
        ]);
    }
}
