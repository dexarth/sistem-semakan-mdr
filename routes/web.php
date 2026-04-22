<?php

use App\Http\Controllers\Admin\BuildingRecordController;
use App\Http\Controllers\Admin\CheckingLogController;
use App\Http\Controllers\Admin\PremiseCategoryController;
use App\Http\Controllers\Admin\PremiseController;
use App\Http\Controllers\Admin\TaxRecordController;
use App\Http\Controllers\Admin\WasteScheduleController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\Staff\PremiseProfileController;
use App\Http\Controllers\Staff\PremiseSearchController;
use App\Http\Controllers\StaffDashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect('/login'))->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route(auth()->user()->isAdmin() ? 'admin.dashboard' : 'staff.dashboard');
    })->name('dashboard');

    // ── Admin ────────────────────────────────────────────────────────────────
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

        // Premise categories
        Route::resource('categories', PremiseCategoryController::class)->except(['show']);

        // Premises
        Route::resource('premises', PremiseController::class);

        // Tax records (nested under premise)
        Route::prefix('premises/{premise}')->name('premises.')->group(function () {
            Route::get('tax-records/create', [TaxRecordController::class, 'create'])->name('tax-records.create');
            Route::post('tax-records', [TaxRecordController::class, 'store'])->name('tax-records.store');
            Route::get('tax-records/{taxRecord}/edit', [TaxRecordController::class, 'edit'])->name('tax-records.edit');
            Route::put('tax-records/{taxRecord}', [TaxRecordController::class, 'update'])->name('tax-records.update');
            Route::delete('tax-records/{taxRecord}', [TaxRecordController::class, 'destroy'])->name('tax-records.destroy');

            // Building records (nested under premise)
            Route::get('building-records/create', [BuildingRecordController::class, 'create'])->name('building-records.create');
            Route::post('building-records', [BuildingRecordController::class, 'store'])->name('building-records.store');
            Route::get('building-records/{buildingRecord}/edit', [BuildingRecordController::class, 'edit'])->name('building-records.edit');
            Route::put('building-records/{buildingRecord}', [BuildingRecordController::class, 'update'])->name('building-records.update');
            Route::delete('building-records/{buildingRecord}', [BuildingRecordController::class, 'destroy'])->name('building-records.destroy');
        });

        // Waste collection schedules
        Route::resource('waste-schedules', WasteScheduleController::class)->except(['show']);

        // Tax records (global listing)
        Route::get('tax-records', [TaxRecordController::class, 'index'])->name('tax-records.index');

        // Checking logs (read-only)
        Route::get('checking-logs', [CheckingLogController::class, 'index'])->name('checking-logs.index');
    });

    // ── Staff ─────────────────────────────────────────────────────────────────
    Route::middleware('role:staff')->prefix('staff')->name('staff.')->group(function () {
        Route::get('dashboard', [StaffDashboardController::class, 'index'])->name('dashboard');
        Route::get('premises/search', [PremiseSearchController::class, 'index'])->name('premises.search');
        Route::get('premises/{premise}', [PremiseProfileController::class, 'show'])->name('premises.show');
    });
});

require __DIR__.'/settings.php';
