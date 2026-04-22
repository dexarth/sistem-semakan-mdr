<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('waste_collection_schedules', function (Blueprint $table) {
            $table->id();
            $table->string('area')->nullable();
            $table->string('zone')->nullable();
            $table->string('road_name')->nullable();
            $table->foreignId('premise_category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('collection_day');
            $table->string('collection_time')->nullable();
            $table->text('notes')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('waste_collection_schedules');
    }
};
