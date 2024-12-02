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
        Schema::create('wallets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->references('id')->on('users')->noActionOnDelete();
            $table->decimal('essential_needs_percentage', 10, 2)->default(50); // Porcentaje para necesidades esenciales
            $table->decimal('discretionary_spending_percentage', 10, 2)->default(30); // Porcentaje para gastos prescindibles
            $table->decimal('savings_percentage', 10, 2)->default(20); // Porcentaje de ahorros
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};
