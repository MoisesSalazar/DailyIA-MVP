<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('egresses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('wallet_id')->references('id')->on('wallets')->noActionOnDelete();
            $table->uuid('tag_id')->references('id')->on('tags')->noActionOnDelete();
            $table->string('name');
            $table->integer('month')->nullable(); // Mes
            $table->integer('year')->nullable(); // Año
            $table->decimal('budget', 10, 2); // Presupuesto
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('egresses');
    }
};
