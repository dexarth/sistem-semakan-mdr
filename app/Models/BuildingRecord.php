<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BuildingRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'premise_id',
        'submission_status',
        'approval_status',
        'submission_date',
        'approval_date',
        'remarks',
    ];

    protected function casts(): array
    {
        return [
            'submission_date' => 'date',
            'approval_date' => 'date',
        ];
    }

    public const SUBMISSION_STATUSES = [
        'Belum Hantar Pelan',
        'Sudah Hantar Pelan',
        'Dalam Semakan',
        'Sudah Lulus',
        'Ditolak',
        'Tiada Rekod',
    ];

    public const APPROVAL_STATUSES = [
        'Belum Diproses',
        'Dalam Semakan',
        'Sudah Lulus',
        'Ditolak',
        'Tiada Rekod',
    ];

    public function premise(): BelongsTo
    {
        return $this->belongsTo(Premise::class);
    }
}
