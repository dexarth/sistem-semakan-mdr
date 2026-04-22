<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Premise extends Model
{
    use HasFactory;

    protected $fillable = [
        'premise_category_id',
        'owner_name',
        'premise_name',
        'grant_number',
        'ic_number',
        'mailing_address',
        'phone_number',
        'zone',
        'area',
        'status',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(PremiseCategory::class, 'premise_category_id');
    }

    public function taxRecords(): HasMany
    {
        return $this->hasMany(TaxRecord::class);
    }

    public function currentYearTax(): HasOne
    {
        return $this->hasOne(TaxRecord::class)
            ->where('tax_year', now()->year)
            ->latestOfMany();
    }

    public function buildingRecords(): HasMany
    {
        return $this->hasMany(BuildingRecord::class);
    }

    public function latestBuildingRecord(): HasOne
    {
        return $this->hasOne(BuildingRecord::class)->latestOfMany();
    }

    public function checkingLogs(): HasMany
    {
        return $this->hasMany(CheckingLog::class);
    }

    public function getWasteSchedule(): ?WasteCollectionSchedule
    {
        return WasteCollectionSchedule::where('status', 'active')
            ->where(function (Builder $q) {
                $q->where('area', $this->area)
                    ->orWhere('zone', $this->zone);
            })
            ->where(function (Builder $q) {
                $q->whereNull('premise_category_id')
                    ->orWhere('premise_category_id', $this->premise_category_id);
            })
            ->first();
    }

    public function scopeSearch(Builder $query, string $keyword): Builder
    {
        return $query->where(function (Builder $q) use ($keyword) {
            $q->where('owner_name', 'like', "%{$keyword}%")
                ->orWhere('premise_name', 'like', "%{$keyword}%")
                ->orWhere('grant_number', 'like', "%{$keyword}%")
                ->orWhere('ic_number', 'like', "%{$keyword}%")
                ->orWhere('mailing_address', 'like', "%{$keyword}%")
                ->orWhere('phone_number', 'like', "%{$keyword}%");
        });
    }
}
