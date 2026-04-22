<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePremiseRequest;
use App\Http\Requests\Admin\UpdatePremiseRequest;
use App\Models\BuildingRecord;
use App\Models\Premise;
use App\Models\PremiseCategory;
use App\Models\TaxRecord;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PremiseController extends Controller
{
    public function index(Request $request): Response
    {
        $premises = Premise::with('category')
            ->when($request->search, fn ($q) => $q->search($request->search))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        $selectedPremise = null;
        if ($request->show) {
            $selectedPremise = Premise::with(['category', 'taxRecords', 'buildingRecords'])
                ->find($request->show);
            if ($selectedPremise) {
                $selectedPremise->waste_schedule = $selectedPremise->getWasteSchedule();
            }
        }

        return Inertia::render('admin/premises/index', [
            'premises'                    => $premises,
            'filters'                     => $request->only('search'),
            'categories'                  => PremiseCategory::orderBy('name')->get(['id', 'name']),
            'selectedPremise'             => $selectedPremise,
            'taxStatuses'                 => TaxRecord::STATUSES,
            'taxCurrentYear'              => now()->year,
            'buildingSubmissionStatuses'  => BuildingRecord::SUBMISSION_STATUSES,
            'buildingApprovalStatuses'    => BuildingRecord::APPROVAL_STATUSES,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/premises/create', [
            'categories' => PremiseCategory::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StorePremiseRequest $request): RedirectResponse
    {
        $premise = Premise::create($request->validated());

        return redirect()->route('admin.premises.index', ['show' => $premise->id])
            ->with('success', 'Premis berjaya ditambah.');
    }

    public function show(Premise $premise): Response
    {
        $premise->load(['category', 'taxRecords', 'buildingRecords', 'currentYearTax', 'latestBuildingRecord']);
        $wasteSchedule = $premise->getWasteSchedule();

        return Inertia::render('admin/premises/show', [
            'premise'      => $premise,
            'wasteSchedule' => $wasteSchedule,
        ]);
    }

    public function edit(Premise $premise): Response
    {
        return Inertia::render('admin/premises/edit', [
            'premise'    => $premise->load('category'),
            'categories' => PremiseCategory::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(UpdatePremiseRequest $request, Premise $premise): RedirectResponse
    {
        $premise->update($request->validated());

        return redirect()->route('admin.premises.index', ['show' => $premise->id])
            ->with('success', 'Premis berjaya dikemaskini.');
    }

    public function destroy(Premise $premise): RedirectResponse
    {
        $premise->delete();

        return redirect()->route('admin.premises.index')
            ->with('success', 'Premis berjaya dipadam.');
    }
}
