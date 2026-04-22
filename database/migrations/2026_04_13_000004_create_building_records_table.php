<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('building_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('premise_id')->constrained()->cascadeOnDelete();
            $table->string('submission_status')->default('Belum Hantar Pelan');
            $table->string('approval_status')->nullable();
            $table->date('submission_date')->nullable();
            $table->date('approval_date')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('building_records');
    }
};
