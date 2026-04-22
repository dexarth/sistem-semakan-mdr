<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTaxRecordRequest;
use App\Models\Premise;
use App\Models\TaxRecord;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaxRecordController extends Controller
{
    public function index(Request $request): Response
    {
        $query = TaxRecord::with('premise')
            ->latest('tax_year');

        if ($year = $request->input('year')) {
            $query->where('tax_year', $year);
        }

        if ($status = $request->input('status')) {
            $query->where('payment_status', $status);
        }

        return Inertia::render('admin/tax-records/index', [
            'records' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('year', 'status'),
            'statuses' => TaxRecord::STATUSES,
            'currentYear' => now()->year,
        ]);
    }

    public function create(Premise $premise): Response
    {
        return Inertia::render('admin/tax-records/create', [
            'premise' => $premise,
            'statuses' => TaxRecord::STATUSES,
            'currentYear' => now()->year,
        ]);
    }

    public function store(StoreTaxRecordRequest $request, Premise $premise): RedirectResponse
    {
        $premise->taxRecords()->create($request->validated());

        return redirect()->route('admin.premises.index', ['show' => $premise->id])
            ->with('success', 'Rekod cukai berjaya ditambah.');
    }

    public function edit(Premise $premise, TaxRecord $taxRecord): Response
    {
        return Inertia::render('admin/tax-records/edit', [
            'premise' => $premise,
            'taxRecord' => $taxRecord,
            'statuses' => TaxRecord::STATUSES,
        ]);
    }

    public function update(StoreTaxRecordRequest $request, Premise $premise, TaxRecord $taxRecord): RedirectResponse
    {
        $taxRecord->update($request->validated());

        return redirect()->route('admin.premises.index', ['show' => $premise->id])
            ->with('success', 'Rekod cukai berjaya dikemaskini.');
    }

    public function destroy(Premise $premise, TaxRecord $taxRecord): RedirectResponse
    {
        $taxRecord->delete();

        return redirect()->route('admin.premises.index', ['show' => $premise->id])
            ->with('success', 'Rekod cukai berjaya dipadam.');
    }
}
