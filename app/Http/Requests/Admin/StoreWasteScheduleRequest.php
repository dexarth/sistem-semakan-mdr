<?php

namespace App\Http\Requests\Admin;

use App\Models\WasteCollectionSchedule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreWasteScheduleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'area'                => ['nullable', 'string', 'max:100'],
            'zone'                => ['nullable', 'string', 'max:100'],
            'road_name'           => ['nullable', 'string', 'max:255'],
            'premise_category_id' => ['nullable', 'exists:premise_categories,id'],
            'collection_day'      => ['required', Rule::in(WasteCollectionSchedule::DAYS)],
            'collection_time'     => ['nullable', 'string', 'max:50'],
            'notes'               => ['nullable', 'string', 'max:500'],
            'status'              => ['required', 'in:active,inactive'],
        ];
    }
}
