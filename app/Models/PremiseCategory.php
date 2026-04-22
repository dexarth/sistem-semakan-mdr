<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PremiseCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'code'];

    public function premises(): HasMany
    {
        return $this->hasMany(Premise::class);
    }

    public function wasteSchedules(): HasMany
    {
        return $this->hasMany(WasteCollectionSchedule::class);
    }
}
