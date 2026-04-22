<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WasteCollectionSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'area',
        'zone',
        'road_name',
        'premise_category_id',
        'collection_day',
        'collection_time',
        'notes',
        'status',
    ];

    public const DAYS = [
        'Isnin',
        'Selasa',
        'Rabu',
        'Khamis',
        'Jumaat',
        'Sabtu',
        'Ahad',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(PremiseCategory::class, 'premise_category_id');
    }
}
