<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CheckingLog extends Model
{
    protected $fillable = [
        'user_id',
        'premise_id',
        'checked_at',
        'remarks',
    ];

    protected function casts(): array
    {
        return [
            'checked_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function premise(): BelongsTo
    {
        return $this->belongsTo(Premise::class);
    }
}
