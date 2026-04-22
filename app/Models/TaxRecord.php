<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaxRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'premise_id',
        'tax_year',
        'payment_status',
        'amount_due',
        'amount_paid',
        'payment_date',
        'remarks',
    ];

    protected function casts(): array
    {
        return [
            'payment_date' => 'date',
            'amount_due' => 'decimal:2',
            'amount_paid' => 'decimal:2',
        ];
    }

    public const STATUSES = [
        'Sudah Bayar Tahun Semasa',
        'Belum Bayar Tahun Semasa',
        'Ada Tunggakan',
        'Tiada Rekod',
    ];

    public function premise(): BelongsTo
    {
        return $this->belongsTo(Premise::class);
    }
}
