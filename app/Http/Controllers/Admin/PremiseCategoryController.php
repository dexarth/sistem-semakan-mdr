<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePremiseCategoryRequest;
use App\Models\PremiseCategory;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PremiseCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/categories/index', [
            'categories' => PremiseCategory::withCount('premises')->latest()->paginate(20),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/categories/create');
    }

    public function store(StorePremiseCategoryRequest $request): RedirectResponse
    {
        PremiseCategory::create($request->validated());

        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berjaya ditambah.');
    }

    public function edit(PremiseCategory $category): Response
    {
        return Inertia::render('admin/categories/edit', [
            'category' => $category,
        ]);
    }

    public function update(StorePremiseCategoryRequest $request, PremiseCategory $category): RedirectResponse
    {
        $category->update($request->validated());

        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berjaya dikemaskini.');
    }

    public function destroy(PremiseCategory $category): RedirectResponse
    {
        $category->delete();

        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berjaya dipadam.');
    }
}
