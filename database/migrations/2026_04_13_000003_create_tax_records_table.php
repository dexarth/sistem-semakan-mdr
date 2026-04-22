<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tax_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('premise_id')->constrained()->cascadeOnDelete();
            $table->year('tax_year');
            $table->string('payment_status')->default('Belum Bayar Tahun Semasa');
            $table->decimal('amount_due', 10, 2)->nullable();
            $table->decimal('amount_paid', 10, 2)->nullable();
            $table->date('payment_date')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();

            $table->unique(['premise_id', 'tax_year']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tax_records');
    }
};
