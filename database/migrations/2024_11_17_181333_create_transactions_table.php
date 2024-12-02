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
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('wallet_id')->references('id')->on('wallets')->noActionOnDelete();
            $table->enum('type', ['income', 'egress']);
            $table->uuid('income_id')->references('id')->on('incomes')->noActionOnDelete()->nullable();
            $table->uuid('tag_id')->references('id')->on('tags')->noActionOnDelete()->nullable(); // Nueva columna
            $table->uuid('egress_id')->references('id')->on('egresses')->noActionOnDelete()->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('concept')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
