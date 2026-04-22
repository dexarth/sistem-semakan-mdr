<?php

namespace App\Http\Requests\Admin;

use App\Models\TaxRecord;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaxRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $premiseId = $this->route('premise')?->id;
        $taxRecordId = $this->route('taxRecord')?->id;

        return [
            'tax_year'       => ['required', 'integer', 'min:2000', 'max:2100',
                Rule::unique('tax_records')->where('premise_id', $premiseId)->ignore($taxRecordId),
            ],
            'payment_status' => ['required', Rule::in(TaxRecord::STATUSES)],
            'amount_due'     => ['nullable', 'numeric', 'min:0'],
            'amount_paid'    => ['nullable', 'numeric', 'min:0'],
            'payment_date'   => ['nullable', 'date'],
            'remarks'        => ['nullable', 'string', 'max:500'],
        ];
    }
}
