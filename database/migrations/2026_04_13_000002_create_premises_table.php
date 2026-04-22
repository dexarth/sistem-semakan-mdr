<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('premises', function (Blueprint $table) {
            $table->id();
            $table->foreignId('premise_category_id')->constrained()->restrictOnDelete();
            $table->string('owner_name');
            $table->string('premise_name')->nullable();
            $table->string('grant_number')->nullable();
            $table->string('ic_number')->nullable();
            $table->text('mailing_address')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('zone')->nullable();
            $table->string('area')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('premises');
    }
};
