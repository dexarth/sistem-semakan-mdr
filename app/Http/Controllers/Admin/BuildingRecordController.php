<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBuildingRecordRequest;
use App\Models\BuildingRecord;
use App\Models\Premise;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BuildingRecordController extends Controller
{
    public function create(Premise $premise): Response
    {
        return Inertia::render('admin/building-records/create', [
            'premise' => $premise,
            'submissionStatuses' => BuildingRecord::SUBMISSION_STATUSES,
            'approvalStatuses' => BuildingRecord::APPROVAL_STATUSES,
        ]);
    }

    public function store(StoreBuildingRecordRequest $request, Premise $premise): RedirectResponse
    {
        $premise->buildingRecords()->create($request->validated());

        return redirect()->route('admin.premises.index', ['show' => $premise->id])
            ->with('success', 'Rekod bangunan berjaya ditambah.');
    }

    public function edit(Premise $premise, BuildingRecord $buildingRecord): Response
    {
        return Inertia::render('admin/building-records/edit', [
            'premise' => $premise,
            'buildingRecord' => $buildingRecord,
            'submissionStatuses' => BuildingRecord::SUBMISSION_STATUSES,
            'approvalStatuses' => BuildingRecord::APPROVAL_STATUSES,
        ]);
    }

    public function update(StoreBuildingRecordRequest $request, Premise $premise, BuildingRecord $buildingRecord): RedirectResponse
    {
        $buildingRecord->update($request->validated());

        return redirect()->route('admin.premises.index', ['show' => $premise->id])
            ->with('success', 'Rekod bangunan berjaya dikemaskini.');
    }

    public function destroy(Premise $premise, BuildingRecord $buildingRecord): RedirectResponse
    {
        $buildingRecord->delete();

        return redirect()->route('admin.premises.index', ['show' => $premise->id])
            ->with('success', 'Rekod bangunan berjaya dipadam.');
    }
}
