<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StorePremiseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'premise_category_id' => ['required', 'exists:premise_categories,id'],
            'owner_name'          => ['required', 'string', 'max:255'],
            'premise_name'        => ['nullable', 'string', 'max:255'],
            'grant_number'        => ['nullable', 'string', 'max:100'],
            'ic_number'           => ['nullable', 'string', 'max:20'],
            'mailing_address'     => ['nullable', 'string', 'max:500'],
            'phone_number'        => ['nullable', 'string', 'max:20'],
            'zone'                => ['nullable', 'string', 'max:100'],
            'area'                => ['nullable', 'string', 'max:100'],
            'status'              => ['required', 'in:active,inactive'],
        ];
    }
}
