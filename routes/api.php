<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Apis\WalletApi;
use App\Apis\EgressApi;
use App\Apis\IncomeApi;
use App\Apis\TransactionApi;
use App\Apis\TagApi;

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('wallets', WalletApi::class)->only(['index', 'show', 'store', 'destroy'])->names([
        'index' => 'api.wallets.index',
        'show' => 'api.wallets.show',
        'store' => 'api.wallets.store',
        'destroy' => 'api.wallets.destroy',
    ]);

    Route::resource('egresses', EgressApi::class)->only(['store', 'show', 'update', 'destroy'])->names([
        'store' => 'api.egresses.store',
        'show' => 'api.egresses.show',
        'update' => 'api.egresses.update',
        'destroy' => 'api.egresses.destroy',
    ]);

    Route::resource('incomes', IncomeApi::class)->only(['store', 'show', 'update', 'destroy'])->names([
        'store' => 'api.incomes.store',
        'update' => 'api.incomes.update',
        'destroy' => 'api.incomes.destroy',
    ]);

    Route::resource('transactions', TransactionApi::class)->only(['store', 'show', 'update', 'destroy'])->names([
        'store' => 'api.transactions.store',
        'show' => 'api.transactions.show',
        'update' => 'api.transactions.update',
        'destroy' => 'api.transactions.destroy',
    ]);

    Route::resource('tags', TagApi::class)->only(['store', 'show', 'update', 'destroy'])->names([
        'store' => 'api.tags.store',
        'show' => 'api.tags.show',
        'update' => 'api.tags.update',
        'destroy' => 'api.tags.destroy',
    ]);

    // Ruta para devolver el usuario autenticado
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('api.user');
});
