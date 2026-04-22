<?php

namespace App\Http\Requests\Admin;

use App\Models\BuildingRecord;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBuildingRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'submission_status' => ['required', Rule::in(BuildingRecord::SUBMISSION_STATUSES)],
            'approval_status'   => ['nullable', Rule::in(BuildingRecord::APPROVAL_STATUSES)],
            'submission_date'   => ['nullable', 'date'],
            'approval_date'     => ['nullable', 'date'],
            'remarks'           => ['nullable', 'string', 'max:500'],
        ];
    }
}
