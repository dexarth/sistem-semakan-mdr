<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\CheckingLog;
use App\Models\Premise;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PremiseProfileController extends Controller
{
    public function show(Request $request, Premise $premise): Response
    {
        $premise->load([
            'category',
            'taxRecords' => fn ($q) => $q->orderByDesc('tax_year'),
            'buildingRecords' => fn ($q) => $q->latest(),
            'currentYearTax',
            'latestBuildingRecord',
        ]);

        $wasteSchedule = $premise->getWasteSchedule();

        // Auto-log this view
        CheckingLog::create([
            'user_id' => $request->user()->id,
            'premise_id' => $premise->id,
            'checked_at' => now(),
        ]);

        return Inertia::render('staff/premises/show', [
            'premise' => $premise,
            'wasteSchedule' => $wasteSchedule,
            'currentYear' => now()->year,
        ]);
    }
}
