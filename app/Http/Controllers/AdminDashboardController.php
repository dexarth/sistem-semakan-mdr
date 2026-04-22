<?php

namespace App\Http\Controllers;

use App\Models\BuildingRecord;
use App\Models\CheckingLog;
use App\Models\Premise;
use App\Models\TaxRecord;
use App\Models\WasteCollectionSchedule;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $currentYear = now()->year;

        // ── Summary stats ────────────────────────────────────────────────────
        $totalPremises  = Premise::where('status', 'active')->count();
        $totalSchedules = WasteCollectionSchedule::where('status', 'active')->count();

        $taxStats = TaxRecord::where('tax_year', $currentYear)
            ->selectRaw("
                COUNT(*) as total,
                SUM(CASE WHEN payment_status = 'Sudah Bayar Tahun Semasa' THEN 1 ELSE 0 END) as paid,
                SUM(CASE WHEN payment_status = 'Ada Tunggakan'            THEN 1 ELSE 0 END) as arrears,
                SUM(CASE WHEN payment_status = 'Belum Bayar Tahun Semasa' THEN 1 ELSE 0 END) as unpaid
            ")
            ->first();

        $buildingStats = BuildingRecord::selectRaw("
                COUNT(*) as total,
                SUM(CASE WHEN approval_status = 'Dalam Semakan' THEN 1 ELSE 0 END) as in_review,
                SUM(CASE WHEN approval_status = 'Sudah Lulus'   THEN 1 ELSE 0 END) as approved
            ")
            ->first();

        // ── Urgent tables ────────────────────────────────────────────────────
        $arrearsRecords = TaxRecord::with('premise:id,owner_name,zone,area')
            ->where('tax_year', $currentYear)
            ->where('payment_status', 'Ada Tunggakan')
            ->orderByDesc('amount_due')
            ->limit(8)
            ->get(['id', 'premise_id', 'tax_year', 'payment_status', 'amount_due', 'amount_paid']);

        $pendingBuilding = BuildingRecord::with('premise:id,owner_name')
            ->where('approval_status', 'Dalam Semakan')
            ->orderByDesc('created_at')
            ->limit(8)
            ->get(['id', 'premise_id', 'submission_status', 'approval_status', 'submission_date']);

        // ── Recent checking logs ─────────────────────────────────────────────
        $recentLogs = CheckingLog::with(['user:id,name', 'premise:id,owner_name'])
            ->orderByDesc('checked_at')
            ->limit(8)
            ->get(['id', 'user_id', 'premise_id', 'checked_at', 'remarks']);

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalPremises'  => $totalPremises,
                'totalSchedules' => $totalSchedules,
                'currentYear'    => $currentYear,
                'tax'            => $taxStats,
                'building'       => $buildingStats,
            ],
            'arrearsRecords' => $arrearsRecords,
            'pendingBuilding' => $pendingBuilding,
            'recentLogs'     => $recentLogs,
        ]);
    }
}
