<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CheckingLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CheckingLogController extends Controller
{
    public function index(Request $request): Response
    {
        $logs = CheckingLog::with(['user', 'premise'])
            ->when($request->search, fn ($q) => $q->whereHas('premise', fn ($p) => $p->where('owner_name', 'like', "%{$request->search}%")))
            ->latest('checked_at')
            ->paginate(30)
            ->withQueryString();

        return Inertia::render('admin/checking-logs/index', [
            'logs' => $logs,
            'filters' => $request->only('search'),
        ]);
    }
}
