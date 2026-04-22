<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreWasteScheduleRequest;
use App\Models\PremiseCategory;
use App\Models\WasteCollectionSchedule;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WasteScheduleController extends Controller
{
    public function index(Request $request): Response
    {
        $schedules = WasteCollectionSchedule::with('category')
            ->when($request->search, fn ($q) => $q->where('area', 'like', "%{$request->search}%")
                ->orWhere('zone', 'like', "%{$request->search}%")
                ->orWhere('road_name', 'like', "%{$request->search}%"))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/waste-schedules/index', [
            'schedules'  => $schedules,
            'filters'    => $request->only('search'),
            'categories' => PremiseCategory::orderBy('name')->get(['id', 'name']),
            'days'       => WasteCollectionSchedule::DAYS,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/waste-schedules/create', [
            'categories' => PremiseCategory::orderBy('name')->get(['id', 'name']),
            'days' => WasteCollectionSchedule::DAYS,
        ]);
    }

    public function store(StoreWasteScheduleRequest $request): RedirectResponse
    {
        WasteCollectionSchedule::create($request->validated());

        return redirect()->route('admin.waste-schedules.index')
            ->with('success', 'Jadual kutipan berjaya ditambah.');
    }

    public function edit(WasteCollectionSchedule $wasteSchedule): Response
    {
        return Inertia::render('admin/waste-schedules/edit', [
            'schedule' => $wasteSchedule,
            'categories' => PremiseCategory::orderBy('name')->get(['id', 'name']),
            'days' => WasteCollectionSchedule::DAYS,
        ]);
    }

    public function update(StoreWasteScheduleRequest $request, WasteCollectionSchedule $wasteSchedule): RedirectResponse
    {
        $wasteSchedule->update($request->validated());

        return redirect()->route('admin.waste-schedules.index')
            ->with('success', 'Jadual kutipan berjaya dikemaskini.');
    }

    public function destroy(WasteCollectionSchedule $wasteSchedule): RedirectResponse
    {
        $wasteSchedule->delete();

        return redirect()->route('admin.waste-schedules.index')
            ->with('success', 'Jadual kutipan berjaya dipadam.');
    }
}
